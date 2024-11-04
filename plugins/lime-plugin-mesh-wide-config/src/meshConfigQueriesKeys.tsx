import { QueryKey } from "@tanstack/react-query";

import { sharedStateQueries } from "components/shared-state/SharedStateQueriesKeys";
import { MeshConfigTypes } from "components/shared-state/SharedStateTypes";

const MeshConfigQueryKeys: { [key: string]: QueryKey } = {
    getNodeStatus: ["lime-mesh-config", "get_node_status"],
    getCommunityConfig: ["lime-mesh-config ", "get_community_config"],
    remoteConfirmUpgrade: ["lime-mesh-config", "start_config_transaction"],
    startSafeReboot: ["lime-mesh-config", "start_safe_reboot"],
    confirm: ["lime-mesh-config", "confirm"],
    remoteAbort: ["lime-mesh-config", "abort"],
};

export const meshConfigStateKey: keyof MeshConfigTypes = "mesh_config";

export const meshConfigQueryKeys = {
    getMeshWideConfigInfo: (): QueryKey =>
        sharedStateQueries.getFromSharedState(meshConfigStateKey) as QueryKey,
    getNodeStatus: (): QueryKey => MeshConfigQueryKeys.getNodeStatus,
    getCommunityConfig: (): QueryKey => MeshConfigQueryKeys.getCommunityConfig,
    remoteConfirmUpgrade: (): QueryKey =>
        MeshConfigQueryKeys.remoteConfirmUpgrade,
    startSafeReboot: (): QueryKey => MeshConfigQueryKeys.startSafeReboot,
    confirm: (): QueryKey => MeshConfigQueryKeys.confirm,
    remoteAbort: (): QueryKey => MeshConfigQueryKeys.remoteAbort,
};
