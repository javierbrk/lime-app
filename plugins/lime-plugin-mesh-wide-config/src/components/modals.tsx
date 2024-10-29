import { Trans, t } from "@lingui/macro";
import { Label } from "@tanstack/react-query-devtools/build/lib/Explorer";
import { FormProvider, useForm } from "react-hook-form";

import { Modal, ModalProps } from "components/Modal/Modal";
import InputField from "components/inputs/InputField";
import switchStyle from "components/switch";

import { EditableField } from "plugins/lime-plugin-mesh-wide-config/src/components/FormEdit";

export const DeletePropModal = ({
    prop,
    ...rest
}: { prop: string } & Pick<ModalProps, "onDelete" | "isOpen" | "onClose">) => (
    <Modal title={<Trans>Delete property</Trans>} {...rest}>
        <div>
            <Trans>
                Are you sure you want to delete the <strong>{prop}</strong>{" "}
                property?
            </Trans>
        </div>
    </Modal>
);

export const EditPropModal = ({
    prop,
    ...rest
}: { prop: string } & Pick<ModalProps, "onSuccess" | "isOpen" | "onClose">) => (
    <Modal
        title={<Trans>Edit property</Trans>}
        successBtnText={<Trans>Edit</Trans>}
        {...rest}
        cancelBtn
    >
        <div>
            <Trans>
                Are you sure you want to edit the <strong>{prop}</strong>{" "}
                property?
            </Trans>
        </div>
    </Modal>
);

export interface AddNewSectionFormProps {
    name: string;
    value?: string;
    values?: string[];
    isList?: boolean;
}

export const AddNewSectionModal = ({
    onSuccess,
    sectionName,
    ...rest
}: {
    onSuccess: (data: AddNewSectionFormProps) => void;
    sectionName?: string;
} & Pick<ModalProps, "isOpen" | "onClose">) => {
    const fmethods = useForm<AddNewSectionFormProps>({
        defaultValues: { name: "", value: "", values: [""], isList: false },
    });

    const handleSuccess = (data: AddNewSectionFormProps) => {
        onSuccess(data); // Call the parent onSuccess handler
        reset(); // Reset the form after successful submission
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = fmethods;

    let title = <Trans>Add new section</Trans>;
    if (sectionName) {
        title = <Trans>Add new section for {sectionName}</Trans>;
    }

    const isList = watch("isList");

    return (
        <Modal
            title={title}
            successBtnText={<Trans>Add</Trans>}
            {...rest}
            onSuccess={handleSubmit(handleSuccess)}
        >
            <FormProvider {...fmethods}>
                <InputField
                    id={"name"}
                    label={<Trans>Name</Trans>}
                    {...register("name", {
                        required: t`This field cannot be empty`,
                        minLength: {
                            value: 1,
                            message: t`Minimum length is 1`,
                        },
                    })}
                    error={errors.name?.message}
                />
                {sectionName && (
                    <>
                        <div className={switchStyle.toggles}>
                            <input
                                type="checkbox"
                                id="enabled"
                                {...register("isList")}
                            />
                            <label htmlFor="enabled">
                                <Trans>Is a list</Trans>
                            </label>
                        </div>
                        <Label>Value</Label>
                        <EditableField
                            name={isList ? "values" : "value"}
                            isList={isList}
                        />
                    </>
                )}
            </FormProvider>
        </Modal>
    );
};
