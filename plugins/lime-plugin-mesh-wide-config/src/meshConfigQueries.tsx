import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

import {
    getCommunityConfig,
    getMeshWideConfig,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigApi";
import { meshConfigQueryKeys } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueriesKeys";
import {
    GetCommunityConfigResponse,
    IMeshWideConfig,
    MeshWideConfigState,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";
import { parseConfigFile } from "plugins/lime-plugin-mesh-wide-config/src/utils/jsonParser";

export function useCommunityConfig(
    params?: Omit<
        UseQueryOptions<GetCommunityConfigResponse, Error, IMeshWideConfig>,
        "queryFn" | "queryKey"
    >
) {
    return useQuery<GetCommunityConfigResponse, Error, IMeshWideConfig>({
        queryKey: meshConfigQueryKeys.getCommunityConfig(),
        queryFn: getCommunityConfig,
        select: (data) => parseConfigFile(data.file_contents),
        ...params,
    });
}

export function useMeshWideConfigState(
    params?: Omit<UseQueryOptions<MeshWideConfigState>, "queryFn" | "queryKey">
) {
    return useQuery<MeshWideConfigState>({
        queryKey: meshConfigQueryKeys.getMeshWideConfigInfo() as QueryKey,
        queryFn: getMeshWideConfig,
        ...params,
    });
}
