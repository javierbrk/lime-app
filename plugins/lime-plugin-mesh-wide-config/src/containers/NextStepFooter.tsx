import { Trans } from "@lingui/macro";
import { ComponentChildren } from "preact";
import { useState } from "preact/hooks";

import { FooterStatus } from "components/status/footer";

import LimeConfigEditForm from "plugins/lime-plugin-mesh-wide-config/src/containers/LimeConfigEditForm";
import { useMeshConfig } from "plugins/lime-plugin-mesh-wide-config/src/providers/useMeshConfigProvider";

const NextStepFooter = () => {
    const [showEditConfig, setShowEditConfig] = useState(false);
    const { nodeInfo } = useMeshConfig();

    let footer: ComponentChildren = null;
    switch (nodeInfo.transaction_state) {
        case "DEFAULT":
            footer = (
                <FooterStatus
                    status={"success"}
                    onClick={() => {
                        setShowEditConfig(true);
                    }}
                    btn={<Trans>Change LiMe Config</Trans>}
                >
                    <Trans>You can change shared network configuration</Trans>
                </FooterStatus>
            );
            break;
    }

    if (showEditConfig) {
        return <LimeConfigEditForm onClose={() => setShowEditConfig(false)} />;
    }

    return (
        <>
            {footer}
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
            {/*<AbortModal isOpen={showAbort} onClose={closeAbort} />*/}
        </>
    );
};

export default NextStepFooter;
