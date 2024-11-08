import { useState } from "preact/hooks";
import React from "react";

import { Button } from "components/buttons/button";
import WizardWrapper from "components/mesh-wide-wizard/WizardWrapper";

import LimeConfigEditForm from "plugins/lime-plugin-mesh-wide-config/src/containers/LimeConfigEditForm";
import NextStepFooter from "plugins/lime-plugin-mesh-wide-config/src/containers/NextStepFooter";
import NodesListPage from "plugins/lime-plugin-mesh-wide-config/src/containers/NodesListPage";
import StatusPage from "plugins/lime-plugin-mesh-wide-config/src/containers/StatusPage";
import {
    ConfigProvider,
    useMeshConfig,
} from "plugins/lime-plugin-mesh-wide-config/src/providers/useMeshConfigProvider";

const MeshConfig = () => {
    const {
        isLoading: meshConfigLoading,
        meshInfo,
        nodeInfo,
    } = useMeshConfig();

    const isLoading =
        meshConfigLoading || nodeInfo === undefined || meshInfo === undefined;

    return (
        <WizardWrapper
            // error={error}
            // isError={isError}
            isLoading={isLoading}
            // banner={BannerNotification}
            statusPage={StatusPage}
            nodesList={NodesListPage}
            footer={NextStepFooter}
        />
    );
};

const MeshConfigPage = () => (
    <ConfigProvider>
        <MeshConfig />
    </ConfigProvider>
);

export default MeshConfigPage;
