import { ComponentChildren, createContext } from "preact";
import { useState } from "preact/hooks";
import { useCallback, useContext, useMemo } from "react";

import {
    UseParallelConfirmConfig,
    UseParallelReadyForApplyType,
    useConfigNodeState,
    useMeshWideConfigState,
    useParallelAbort,
    useParallelConfirmConfig,
    useParallelReadyForApply,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueries";
import { MeshConfigQueryKeys } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueriesKeys";
import {
    NodeMeshConfigInfo,
    StepperWizardState,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

import queryCache from "utils/queryCache";

const NODE_STATUS_REFETCH_INTERVAL = 5000;

const getWizardState = (
    nodeInfo: NodeMeshConfigInfo | undefined,
    isAborting: boolean,
    scheduleSafeReboot: UseParallelReadyForApplyType | undefined,
    confirmConfig: UseParallelConfirmConfig | undefined
): StepperWizardState => {
    if (!nodeInfo) return;
    if (isAborting) return "ABORTING";
    if (scheduleSafeReboot?.isLoading) {
        return "SENDING_START_SCHEDULE";
    }
    if (
        scheduleSafeReboot?.results?.length ||
        scheduleSafeReboot?.errors?.length
    ) {
        return "RESTART_SCHEDULED";
    }
    if (
        nodeInfo.transaction_state === "CONFIRMATION_PENDING" ||
        nodeInfo.transaction_state === "CONFIRMED"
    ) {
        if (confirmConfig?.isLoading) {
            return "SENDING_CONFIRMATION";
        }
        if (confirmConfig?.errors?.length) {
            return "CONFIRMATION_PENDING";
        }
    }
    return nodeInfo?.transaction_state ?? "DEFAULT";
};

export const useMeshConfigProvider = () => {
    // UseCallback to invalidate queries
    const invalidateQueries = useCallback(() => {
        return queryCache.invalidateQueries({
            queryKey: MeshConfigQueryKeys.getNodeStatus,
        });
    }, []);

    const scheduleSafeReboot = useParallelReadyForApply();
    const confirmConfig = useParallelConfirmConfig();

    const {
        data: meshInfo,
        isLoading: meshInfoLoading,
        // isError: isMeshInfoQueryError,
        // error: meshInfoQueryError,
    } = useMeshWideConfigState({
        refetchInterval: NODE_STATUS_REFETCH_INTERVAL,
    });
    const { data: nodeInfo, isLoading: nodeInfoLoading } = useConfigNodeState({
        refetchInterval: NODE_STATUS_REFETCH_INTERVAL,
    });

    // Inner state to control is aborting callback awaiting until query invalidation
    const [isAborting, setIsAborting] = useState(false);
    const { callMutations: abortMutation } = useParallelAbort();

    const allNodesReadyForApply = useMemo(() => {
        return Object.values(meshInfo || {}).every(
            (node) => node.transaction_state === "READY_FOR_APPLY"
        );
    }, [meshInfo]);

    const allNodesConfirmed = useMemo(() => {
        return Object.values(meshInfo || {}).every(
            (node) => node.transaction_state === "CONFIRMED"
        );
    }, [meshInfo]);

    const isLoading = meshInfoLoading || nodeInfoLoading;

    const abort = useCallback(async () => {
        setIsAborting(true);
        abortMutation()
            .then(() => {
                return invalidateQueries();
            })
            .finally(() => {
                setIsAborting(false);
            });
    }, [abortMutation, invalidateQueries]);

    const wizardState: StepperWizardState = useMemo(
        () =>
            getWizardState(
                nodeInfo,
                isAborting,
                scheduleSafeReboot,
                confirmConfig
            ),
        [nodeInfo, isAborting]
    );

    const totalNodes = meshInfo && Object.entries(meshInfo).length;

    return {
        nodeInfo,
        meshInfo,
        isLoading,
        allNodesReadyForApply,
        allNodesConfirmed,
        abort,
        wizardState,
        totalNodes,
    };
};

export const ConfigContext = createContext<
    ReturnType<typeof useMeshConfigProvider> | undefined
>(undefined);

export const ConfigProvider = ({
    children,
}: {
    children: ComponentChildren;
}) => {
    const config = useMeshConfigProvider();
    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useMeshConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error("useConfig must be used within an ConfigProvider");
    }
    return context;
};
