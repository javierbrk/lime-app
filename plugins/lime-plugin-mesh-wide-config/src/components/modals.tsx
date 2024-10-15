import { Trans } from "@lingui/macro";
import { useForm } from "react-hook-form";

import { Modal, ModalProps } from "components/Modal/Modal";
import InputField from "components/inputs/InputField";

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
}

export const AddNewSectionModal = ({
    onSuccess,
    ...rest
}: { onSuccess: (data: AddNewSectionFormProps) => void } & Pick<
    ModalProps,
    "isOpen" | "onClose"
>) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddNewSectionFormProps>({
        defaultValues: { name: "" },
    });

    const actionModal = useCallback(
        (actionCb: (data) => void, sectionName?: string) => {
            let title = <Trans>Add new section</Trans>;
            if (sectionName) {
                title = <Trans>Add new section for {sectionName}</Trans>;
            }
            setModalState({
                content: (
                    <div>
                        <InputField
                            id={"name"}
                            label={<Trans>Name</Trans>}
                            register={register}
                        />
                    </div>
                ),
                title,
                successCb: handleSubmit(actionCb),
                successBtnText: <Trans>Add</Trans>,
            });
            toggleModal();
        },
        [handleSubmit, register, setModalState, toggleModal]
    );
};
