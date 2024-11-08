import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

import { doSharedStateApiCall } from "components/shared-state/SharedStateApi";

import { meshConfigQueryKeys } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueriesKeys";
import {
    GetCommunityConfigResponse,
    IMeshWideConfig,
    MeshWideConfigState,
    NodeMeshConfigInfo,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";
import { parseConfigFile } from "plugins/lime-plugin-mesh-wide-config/src/utils/jsonParser";

import { standarizedApiCall } from "utils/standarizedApi";

export function useCommunityConfig(
    params?: Omit<
        UseQueryOptions<GetCommunityConfigResponse, Error, IMeshWideConfig>,
        "queryFn" | "queryKey"
    >
) {
    return useQuery<GetCommunityConfigResponse, Error, IMeshWideConfig>({
        queryKey: meshConfigQueryKeys.getCommunityConfig(),
        queryFn: () =>
            standarizedApiCall<GetCommunityConfigResponse>({
                args: meshConfigQueryKeys.getCommunityConfig(),
            }),
        select: (data) => parseConfigFile(data.file_contents),
        ...params,
    });
}

export function useMeshWideConfigState(
    params?: Omit<UseQueryOptions<MeshWideConfigState>, "queryFn" | "queryKey">
) {
    return useQuery<MeshWideConfigState>({
        queryKey: meshConfigQueryKeys.getMeshWideConfigInfo() as QueryKey,
        queryFn: () =>
            doSharedStateApiCall<"mesh_config">(
                meshConfigQueryKeys.getMeshWideConfigInfo()
            ),
        ...params,
    });
}

export function useConfigNodeState(
    params?: Omit<UseQueryOptions<NodeMeshConfigInfo>, "queryFn" | "queryKey">
) {
    return useQuery<NodeMeshConfigInfo>({
        queryKey: meshConfigQueryKeys.getNodeStatus(),
        queryFn: () =>
            standarizedApiCall<NodeMeshConfigInfo>({
                args: meshConfigQueryKeys.getNodeStatus(),
            }),
        ...params,
    });
}
