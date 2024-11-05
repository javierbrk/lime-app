import { useState } from "preact/hooks";
import React from "react";

import { Button } from "components/buttons/button";
import WizardWrapper from "components/mesh-wide-wizard/WizardWrapper";

import LimeConfigEditForm from "plugins/lime-plugin-mesh-wide-config/src/containers/LimeConfigEditForm";
import NodesListPage from "plugins/lime-plugin-mesh-wide-config/src/containers/NodesListPage";
import StatusPage from "plugins/lime-plugin-mesh-wide-config/src/containers/StatusPage";

const MeshConfigPage = () => {
    const [showEditConfig, setShowEditConfig] = useState(false);

    if (showEditConfig) {
        return <LimeConfigEditForm onClose={() => setShowEditConfig(false)} />;
    }
    const Buttonx = () => {
        return (
            <Button onClick={() => setShowEditConfig(true)}>Show modal</Button>
        );
    };

    return (
        <WizardWrapper
            // error={error}
            // isError={isError}
            isLoading={false}
            // banner={BannerNotification}
            statusPage={StatusPage}
            nodesList={NodesListPage}
            footer={Buttonx}
            // footer={NextStepFooter}
        />
    );
};

export default MeshConfigPage;
