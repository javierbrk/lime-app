import { ComponentChildren, createContext } from "preact";
import { useState } from "preact/hooks";
import { useContext } from "react";

import {
    useConfigNodeState,
    useMeshWideConfigState,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueries";

const NODE_STATUS_REFETCH_INTERVAL = 5000;

export const useMeshConfigProvider = () => {
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

    const isLoading = meshInfoLoading || nodeInfoLoading;

    return { nodeInfo, meshInfo, isLoading };
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
