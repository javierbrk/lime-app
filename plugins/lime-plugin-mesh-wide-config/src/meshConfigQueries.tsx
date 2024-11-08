import {
    UseMutationOptions,
    UseQueryOptions,
    useMutation,
    useQuery,
} from "@tanstack/react-query";

import { doSharedStateApiCall } from "components/shared-state/SharedStateApi";
import { sharedStateQueries } from "components/shared-state/SharedStateQueriesKeys";

import {
    MeshConfigQueryKeys,
    meshConfigStateKey,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueriesKeys";
import {
    GetCommunityConfigResponse,
    IMeshWideConfig,
    MeshWideConfigState,
    NodeMeshConfigInfo,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";
import { parseConfigFile } from "plugins/lime-plugin-mesh-wide-config/src/utils/jsonParser";
import { MeshWideRPCReturnTypes } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";

import {
    ApiServiceParamsType,
    StandarizedApiError,
    standarizedApiCall,
} from "utils/standarizedApi";

export const useCommunityConfig = (
    params?: Omit<
        UseQueryOptions<GetCommunityConfigResponse, Error, IMeshWideConfig>,
        "queryFn" | "queryKey"
    >
) => {
    return useQuery<GetCommunityConfigResponse, Error, IMeshWideConfig>({
        queryKey: MeshConfigQueryKeys.getCommunityConfig,
        queryFn: () =>
            standarizedApiCall<GetCommunityConfigResponse>({
                args: MeshConfigQueryKeys.getCommunityConfig,
            }),
        select: (data) => parseConfigFile(data.file_contents),
        ...params,
    });
};

interface SetCommunityConfigParams {
    file_contents: string;
}

export const useSetCommunityConfig = (
    params?: Omit<
        UseMutationOptions<
            MeshWideRPCReturnTypes,
            StandarizedApiError,
            SetCommunityConfigParams
        >,
        "mutationFn" | "mutationKey"
    >
) => {
    return useMutation<
        MeshWideRPCReturnTypes,
        StandarizedApiError,
        SetCommunityConfigParams
    >({
        mutationKey: MeshConfigQueryKeys.setCommunityConfig,
        mutationFn: (args) => {
            return standarizedApiCall<MeshWideRPCReturnTypes>({
                args: [...MeshConfigQueryKeys.setCommunityConfig, {}],
            });
        },
        ...params,
    });
};

export const useMeshWideConfigState = (
    params?: Omit<UseQueryOptions<MeshWideConfigState>, "queryFn" | "queryKey">
) => {
    const queryKey = sharedStateQueries.getFromSharedState(
        meshConfigStateKey
    ) as ApiServiceParamsType;
    return useQuery<MeshWideConfigState>({
        queryKey,
        queryFn: () => doSharedStateApiCall<"mesh_config">(queryKey),
        ...params,
    });
};

export const useConfigNodeState = (
    params?: Omit<UseQueryOptions<NodeMeshConfigInfo>, "queryFn" | "queryKey">
) => {
    return useQuery<NodeMeshConfigInfo>({
        queryKey: MeshConfigQueryKeys.getNodeStatus,
        queryFn: () =>
            standarizedApiCall<NodeMeshConfigInfo>({
                args: MeshConfigQueryKeys.getNodeStatus,
            }),
        ...params,
    });
};
