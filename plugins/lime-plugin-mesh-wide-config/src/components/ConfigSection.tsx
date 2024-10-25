import { Trans } from "@lingui/macro";
import { useFormContext } from "react-hook-form";

import { useDisclosure } from "components/Modal/useDisclosure";
import { Button, ButtonProps } from "components/buttons/button";
import { Collapsible } from "components/collapsible";
import { useToast } from "components/toast/toastProvider";

import { EditOrDelete } from "plugins/lime-plugin-mesh-wide-config/src/components/Components";
import { OptionContainer } from "plugins/lime-plugin-mesh-wide-config/src/components/OptionForm";
import {
    AddNewSectionFormProps,
    AddNewSectionModal,
    DeletePropModal,
    EditPropModal,
} from "plugins/lime-plugin-mesh-wide-config/src/components/modals";
import {
    IMeshWideConfig,
    IMeshWideSection,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

export const ConfigSection = ({
    title,
    dropdown,
}: {
    title: string;
    dropdown: IMeshWideSection;
}) => {
    return (
        <Collapsible
            title={title}
            initCollapsed={true}
            optionsComponent={<SectionEditOrDelete name={title} />}
        >
            {Object.entries(dropdown).map(([key, value]) => (
                <OptionContainer
                    key={key}
                    sectionName={title}
                    keyString={key}
                />
            ))}
            <AddNewElementBtn sectionName={title} />
        </Collapsible>
    );
};

export const SectionEditOrDelete = ({ name }) => {
    const {
        open: isEditOpen,
        onOpen: openEdit,
        onClose: onCloseEdit,
    } = useDisclosure();
    const {
        open: isDeleteModalOpen,
        onOpen: openDeleteModal,
        onClose: onCloseDeleteModal,
    } = useDisclosure();
    const { showToast } = useToast();

    const onEdit = async () => {
        console.log("edit stuff");
        onCloseEdit();
        showToast({
            text: (
                <Trans>
                    Edited {name} - {new Date().toDateString()}
                </Trans>
            ),
            onAction: () => {
                console.log("Undo action");
            },
        });
    };

    const onDelete = async () => {
        console.log("delete stuff");
        onCloseDeleteModal();
        showToast({
            text: (
                <Trans>
                    Deleted {name} - {new Date().toDateString()}
                </Trans>
            ),
            onAction: () => {
                console.log("Undo action");
            },
        });
    };

    return (
        <>
            <EditOrDelete onEdit={openEdit} onDelete={openDeleteModal} />
            <EditPropModal
                prop={name}
                isOpen={isEditOpen}
                onSuccess={onEdit}
                onClose={onCloseEdit}
            />
            <DeletePropModal
                prop={name}
                isOpen={isDeleteModalOpen}
                onDelete={onDelete}
                onClose={onCloseDeleteModal}
            />
        </>
    );
};

export const AddNewElementBtn = ({ sectionName }: { sectionName?: string }) => {
    const { open, onOpen, onClose } = useDisclosure();
    const { showToast } = useToast();

    const { watch, setValue } = useFormContext<IMeshWideConfig>();
    const section = watch(sectionName);

    const onSuccess = (data: AddNewSectionFormProps) => {
        if (!sectionName) {
            setValue(data.name, {});
        } else {
            let value: string | string[] = data.value;
            if (data.isList) {
                value = data.values;
            }
            setValue(sectionName, {
                ...section,
                [data.name]: value,
            });
        }
        onClose();
        showToast({
            text: <Trans>Added section {data.name}</Trans>,
        });
    };

    return (
        <>
            <AddElementButton onClick={onOpen} />
            <AddNewSectionModal
                sectionName={sectionName}
                isOpen={open}
                onSuccess={onSuccess}
                onClose={onClose}
            />
        </>
    );
};

export const AddElementButton = (props: ButtonProps) => {
    return (
        <Button color={"info"} {...props}>
            <Trans>Add new section</Trans>
        </Button>
    );
};
