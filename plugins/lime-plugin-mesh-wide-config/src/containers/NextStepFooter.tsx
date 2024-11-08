import { Trans } from "@lingui/macro";
import { useState } from "preact/hooks";
import { useMemo } from "react";

import { useDisclosure } from "components/Modal/useDisclosure";
import { StatusIcons } from "components/icons/status";
import { FooterStatus } from "components/status/footer";
import { IStatusAndButton } from "components/status/statusAndButton";

import { AbortModal } from "plugins/lime-plugin-mesh-wide-config/src/components/modals";
import LimeConfigEditForm from "plugins/lime-plugin-mesh-wide-config/src/containers/LimeConfigEditForm";
import { ConfigUpdateState } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";
import { useMeshConfig } from "plugins/lime-plugin-mesh-wide-config/src/providers/useMeshConfigProvider";

function isShowAbortButtonState(value: string): value is ConfigUpdateState {
    return [
        "READY_FOR_APPLY",
        "RESTART_SCHEDULED",
        "CONFIRMATION_PENDING",
        "ERROR",
    ].includes(value);
}

const NextStepFooter = () => {
    const {
        open: showAbort,
        onOpen: openAbort,
        onClose: closeAbort,
    } = useDisclosure();
    const [showEditConfig, setShowEditConfig] = useState(false);
    const { wizardState, allNodesReadyForApply } = useMeshConfig();

    const step: IStatusAndButton | null = useMemo(() => {
        let step: IStatusAndButton | null = null;
        if (showEditConfig) return null;

        switch (wizardState) {
            case "ABORTED":
            case "DEFAULT":
                step = {
                    status: "success",
                    onClick: () => {
                        setShowEditConfig(true);
                    },
                    btn: <Trans>Change LiMe Config</Trans>,
                    children: (
                        <Trans>
                            You can change shared network configuration
                        </Trans>
                    ),
                };
                break;
            case "READY_FOR_APPLY": {
                let status: StatusIcons = "success";
                let text = (
                    <Trans>
                        All nodes have the configuration ready to apply
                    </Trans>
                );
                if (!allNodesReadyForApply) {
                    status = "warning";
                    text = (
                        <Trans>
                            Some nodes are not marked as ready to apply
                        </Trans>
                    );
                }
                step = {
                    status,
                    onClick: () => {
                        setShowEditConfig(true);
                    },
                    btn: <Trans>Apply new configuration</Trans>,
                    children: text,
                };
                break;
            }
        }
        if (isShowAbortButtonState(wizardState)) {
            const showAbort: Pick<
                IStatusAndButton,
                "btnCancel" | "onClickCancel"
            > = {
                btnCancel: <Trans>Abort</Trans>,
                onClickCancel: openAbort,
            };
            step = { ...step, ...showAbort };
        }
        return step;
    }, [allNodesReadyForApply, openAbort, showEditConfig, wizardState]);

    if (showEditConfig) {
        return <LimeConfigEditForm onClose={() => setShowEditConfig(false)} />;
    }

    return (
        <>
            {step && (
                <FooterStatus {...step} fixed={false}>
                    {step.children}
                </FooterStatus>
            )}

            {/*{footer}*/}
            {/*<FooterStatus {...step} fixed={false} />*/}
            {/*<ScheduleUpgradeModal*/}
            {/*    isSuccess={allNodesReadyForUpgrade}*/}
            {/*    isOpen={showScheduleModal}*/}
            {/*    onClose={closeScheduleModal}*/}
            {/*/>*/}
            {/*<ConfirmModal*/}
            {/*    isOpen={showConfirmationModal}*/}
            {/*    onClose={closeConfirmationModal}*/}
            {/*    isSuccess // Ideally we have to implement some kind of state before run the upgrade to check if all nodes are up again.*/}
            {/*/>*/}
            <AbortModal isOpen={showAbort} onClose={closeAbort} />
        </>
    );
};

export default NextStepFooter;
