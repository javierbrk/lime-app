import { useMeshConfig } from "plugins/lime-plugin-mesh-wide-config/src/providers/useMeshConfigProvider";

const StatusPage = () => {
    const { wizardState, nodeInfo } = useMeshConfig();

    switch (wizardState) {
        case "ABORTED":
            return <>Aborted</>;
        case "ERROR":
            return <>{nodeInfo.error}</>;
        case "READY_FOR_APPLY":
            return <>Ready for apply</>;
        case "RESTART_SCHEDULED":
            return <>Restart scheduled</>;
        case "CONFIRMED":
            return <>Confirmed</>;
        case "ABORTING":
            return <>Aborting</>;
        case "CONFIRMATION_PENDING":
            return <>Confirmation pending</>;
        case "DEFAULT":
        default:
            return <>Everything is up to date</>;
    }
};

export default StatusPage;
