import { Trans } from "@lingui/macro";
import { useRef, useState } from "preact/hooks";
import { useFormContext } from "react-hook-form";

import { FooterStatus } from "components/status/footer";
import { useToast } from "components/toast/toastProvider";

export const FormFooter = ({ isDirty }: { isDirty: boolean }) => {
    const { showToast } = useToast();

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
                showToast({
                    text: (
                        <>
                            <Trans>
                                Updating shared state{" "}
                                {new Date().toDateString()}
                            </Trans>
                        </>
                    ),
                });
            }}
        >
            <div className={"flex flex-col "}>{message}</div>
        </FooterStatus>
    );
};
