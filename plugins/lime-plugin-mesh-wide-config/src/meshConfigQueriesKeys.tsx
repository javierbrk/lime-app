import { sharedStateQueries } from "components/shared-state/SharedStateQueriesKeys";
import { MeshConfigTypes } from "components/shared-state/SharedStateTypes";

import { ApiServiceParamsType } from "utils/standarizedApi";

const MeshConfigQueryKeys: { [key: string]: ApiServiceParamsType } = {
    getNodeStatus: ["lime-mesh-config", "get_node_status"],
    getCommunityConfig: ["lime-mesh-config", "get_community_config", {}],
    remoteConfirmUpgrade: ["lime-mesh-config", "start_config_transaction"],
    startSafeReboot: ["lime-mesh-config", "start_safe_reboot"],
    confirm: ["lime-mesh-config", "confirm"],
    remoteAbort: ["lime-mesh-config", "abort"],
};

export const meshConfigStateKey: keyof MeshConfigTypes = "mesh_config";

export const meshConfigQueryKeys = {
    getMeshWideConfigInfo: (): ApiServiceParamsType =>
        sharedStateQueries.getFromSharedState(
            meshConfigStateKey
        ) as ApiServiceParamsType,
    getNodeStatus: (): ApiServiceParamsType =>
        MeshConfigQueryKeys.getNodeStatus,
    getCommunityConfig: () => MeshConfigQueryKeys.getCommunityConfig,
    remoteConfirmUpgrade: (): ApiServiceParamsType =>
        MeshConfigQueryKeys.remoteConfirmUpgrade,
    startSafeReboot: (): ApiServiceParamsType =>
        MeshConfigQueryKeys.startSafeReboot,
    confirm: (): ApiServiceParamsType => MeshConfigQueryKeys.confirm,
    remoteAbort: (): ApiServiceParamsType => MeshConfigQueryKeys.remoteAbort,
};
