import { QueryKey } from "@tanstack/react-query";

import { meshConfigQueryKeys } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueriesKeys";
import {
    GetCommunityConfigResponse,
    MeshWideConfigState,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

import api from "utils/uhttpd.service";

export const getCommunityConfig = async () =>
    meshConfigApiCall<GetCommunityConfigResponse>(
        meshConfigQueryKeys.getCommunityConfig()
    );

export const getMeshWideConfig = async () =>
    meshConfigApiCall<MeshWideConfigState>(
        meshConfigQueryKeys.getMeshWideConfigInfo()
    );

const meshConfigApiCall = async <T>(query: QueryKey, data: any = {}) => {
    const res = await api.call(...query, data);
    if (res.error) {
        throw new Error(`Error getting info code error ${res.error}`);
    }
    return res.data as T;
};
