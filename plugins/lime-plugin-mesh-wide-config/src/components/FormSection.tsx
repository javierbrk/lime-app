import { Trans } from "@lingui/macro";
import { useFormContext } from "react-hook-form";

import { useDisclosure } from "components/Modal/useDisclosure";
import { Collapsible } from "components/collapsible";
import { useToast } from "components/toast/toastProvider";

import { EditOrDelete } from "plugins/lime-plugin-mesh-wide-config/src/components/Components";
import {
    AddElementButton,
    AddNewConfigSection,
} from "plugins/lime-plugin-mesh-wide-config/src/components/FormEdit";
import { OptionContainer } from "plugins/lime-plugin-mesh-wide-config/src/components/FormOption";
import {
    AddNewSectionFormProps,
    AddNewSectionModal,
    DeletePropModal,
    EditPropModal,
} from "plugins/lime-plugin-mesh-wide-config/src/components/modals";
import { IMeshWideSection } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

export const FormSection = ({
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
            <AddNewConfigSection sectionName={title} />
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
