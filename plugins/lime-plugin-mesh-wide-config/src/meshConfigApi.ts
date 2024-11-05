import { meshConfigQueryKeys } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueriesKeys";
import { GetCommunityConfigResponse } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

import { ApiServiceParamsType, standarizedApiCall } from "utils/standarizedApi";

export const getCommunityConfig = async () =>
    standarizedApiCall<GetCommunityConfigResponse>({
        args: meshConfigQueryKeys.getCommunityConfig() as ApiServiceParamsType,
    });
