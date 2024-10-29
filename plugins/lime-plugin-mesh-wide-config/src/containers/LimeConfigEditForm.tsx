import { Trans } from "@lingui/macro";
import { useState } from "preact/hooks";
import { Controller, FormProvider, useForm } from "react-hook-form";

import {
    FullScreenModal,
    IFullScreenModalProps,
} from "components/Modal/FullScreenModal";

import { AddNewConfigSection } from "plugins/lime-plugin-mesh-wide-config/src/components/FormEdit";
import { FormSection } from "plugins/lime-plugin-mesh-wide-config/src/components/FormSection";
import { MeshStatus } from "plugins/lime-plugin-mesh-wide-config/src/components/MeshStatus";
import { useMeshWideConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueries";
import { IMeshWideConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

const LimeConfigEditForm = (props: Partial<IFullScreenModalProps>) => {
    const { data: meshWideConfig, isLoading } = useMeshWideConfig({});

    return (
        <FullScreenModal
            title={<Trans>Mesh wide config</Trans>}
            isLoading={isLoading}
            {...props}
        >
            {!!meshWideConfig && (
                <EditConfigForm meshWideConfig={meshWideConfig} />
            )}
        </FullScreenModal>
    );
};

const EditConfigForm = ({
    meshWideConfig,
}: {
    meshWideConfig: IMeshWideConfig;
}) => {
    const fMethods = useForm<IMeshWideConfig>({
        defaultValues: meshWideConfig,
    });

    const formData = fMethods.watch();

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    return (
        <div className={"flex flex-col h-full w-full max-h-full"}>
            <FormProvider {...fMethods}>
                <form onSubmit={fMethods.handleSubmit(onSubmit)}>
                    <div className={"flex flex-col gap-3"}>
                        {Object.entries(formData).map(
                            ([title, dropdown], index) => (
                                <FormSection
                                    key={index}
                                    title={title}
                                    dropdown={dropdown}
                                />
                            )
                        )}
                        <AddNewConfigSection />
                    </div>
                    <MeshStatus />
                </form>
            </FormProvider>
        </div>
    );
};

export default LimeConfigEditForm;
