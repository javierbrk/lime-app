import {
    useParallelConfirmConfig,
    useParallelReadyForApply,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueries";
import { useMeshConfig } from "plugins/lime-plugin-mesh-wide-config/src/providers/useMeshConfigProvider";

const StatusPage = () => {
    const { wizardState, nodeInfo } = useMeshConfig();
    const { errors, results } = useParallelReadyForApply();
    const { errors: confirmErrors, results: confirmResults } =
        useParallelConfirmConfig();

    switch (wizardState) {
        case "ABORTED":
            return <>Aborted</>;
        case "ERROR":
            return <>{nodeInfo.error}</>;
        case "READY_FOR_APPLY":
            return <>Ready for apply</>;
        case "RESTART_SCHEDULED":
            return (
                <>
                    Restart scheduled on {results?.length ?? 0} nodes with{" "}
                    {errors?.length ?? 0} errors
                </>
            );
        case "CONFIRMED":
            return (
                <>
                    Confirmed {confirmResults?.length ?? 0} nodes with{" "}
                    {confirmErrors?.length ?? 0} errors
                </>
            );
        case "ABORTING":
            return <>Aborting</>;
        case "CONFIRMATION_PENDING":
            return <>Confirmation pending</>;
        case "SENDING_START_SCHEDULE":
            return <>Sending start schedule</>;
        case "SENDING_CONFIRMATION":
            return <>Sending confirmation</>;
        case "DEFAULT":
        default:
            return <>Everything is up to date</>;
    }
};

export default StatusPage;
