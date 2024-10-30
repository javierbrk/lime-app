import { Trans } from "@lingui/macro";
import { useFormContext } from "react-hook-form";

import { FooterStatus } from "components/status/footer";

import { IMeshWideConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";
import { jsonToConfig } from "plugins/lime-plugin-mesh-wide-config/src/utils/jsonParser";

export const FormFooter = ({ isDirty }: { isDirty: boolean }) => {
    const { handleSubmit } = useFormContext<IMeshWideConfig>();

    const onSubmit = (data: IMeshWideConfig) => {
        console.log("Form", data);
        console.log(jsonToConfig(data));
    };

    let message = <Trans>No changes made</Trans>;
    if (isDirty) {
        message = (
            <>
                <Trans>Changes made</Trans>
                <br />
                <span className={"text-xl"}>
                    <Trans>Start mesh wide configuration update</Trans>
                </span>
            </>
        );
    }
    return (
        <FooterStatus
            fixed={false}
            status={isDirty ? "success" : "warning"}
            btn={<Trans>Start Lime Config update</Trans>}
            btnProps={{
                disabled: !isDirty,
            }}
            onClick={() => {
                handleSubmit(onSubmit)();
            }}
        >
            <div className={"flex flex-col "}>{message}</div>
        </FooterStatus>
    );
};
