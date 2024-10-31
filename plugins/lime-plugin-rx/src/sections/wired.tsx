import { Trans } from "@lingui/macro";

import {
    IconsClassName,
    Section,
    SectionTitle,
} from "plugins/lime-plugin-rx/src/components/components";
import { PortsIcon } from "plugins/lime-plugin-rx/src/icons/portsIcon";
import { useNodeStatus } from "plugins/lime-plugin-rx/src/rxQueries";
import { SwitchStatus } from "plugins/lime-plugin-rx/src/rxTypes";

const liro1 = [
    {
        device: "eth0.1",
        num: 5,
        role: "wan",
        link: "down",
    },
    {
        device: "eth0.1",
        num: 0,
        role: "cpu",
        link: "up",
    },
    {
        device: "eth1.2",
        num: 4,
        role: "lan",
        link: "up",
    },
    {
        device: "eth1.2",
        num: 6,
        role: "cpu",
        link: "up",
    },
];

const mocked = [
    {
        device: "eth1",
        num: "wan",
        role: "wan",
    },
    {
        device: "eth0",
        num: "lan",
        role: "lan",
    },
    {
        device: "eth2",
        num: "wan",
        role: "wan",
    },
    {
        device: "eth30",
        num: "lan",
        role: "lan",
    },
    {
        device: "eth214",
        num: "wan",
        role: "wan",
    },
    {
        device: "eth05",
        num: "lan",
        role: "lan",
    },
];

const tplink = [
    {
        device: "eth0.1",
        num: 1,
        role: "lan",
        link: "down",
    },
    {
        device: "eth0.1",
        num: 2,
        role: "lan",
        link: "up",
    },
    {
        device: "eth0.1",
        num: 3,
        role: "lan",
        link: "down",
    },
    {
        device: "eth0.1",
        num: 4,
        role: "lan",
        link: "down",
    },
    {
        device: "eth0.1",
        num: 0,
        role: "cpu",
        link: "up",
    },
    // Modifactions
    {
        device: "eth0.3",
        num: 0,
        role: "lan",
        link: "up",
    },
    {
        device: "eth0.3",
        num: 1,
        role: "lan",
        link: "up",
    },
    {
        device: "eth0.2",
        num: 0,
        role: "wan",
        link: "up",
    },

    {
        device: "eth0.2",
        num: 1,
        role: "wan",
        link: "up",
    },
];

type PortsByRoleAndDevice = {
    [port: string]: { [device: string]: SwitchStatus[] };
};

const Ports = ({ switches }: { switches: SwitchStatus[] }) => {
    const portsByRoleAndDevice: PortsByRoleAndDevice = switches.reduce(
        (acc, obj) => {
            const { role, device } = obj;

            if (!acc[role]) {
                acc[role] = {};
            }
            if (!acc[role][device]) {
                acc[role][device] = [];
            }
            acc[role][device].push(obj);

            return acc;
        },
        {}
    );

    return (
        <div
            className={"flex flex-wrap px-10 gap-4 justify-between"}
            data-testid="ports-container"
        >
            {Object.entries(portsByRoleAndDevice).map(([role, devices]) => {
                if (role.toLowerCase() === "cpu") return null;
                return (
                    <div key={role} className={"flex flex-col h-fit"}>
                        {/*Print role name*/}
                        <h2 className={"font-bold"}>{role.toUpperCase()}</h2>
                        <div className={"flex flex-row gap-5 "}>
                            {Object.entries(devices).map(
                                ([device, ports], k) => (
                                    // Print device name
                                    <div
                                        key={`${device}${k}`}
                                        className={
                                            "flex flex-col justify-start items-start"
                                        }
                                    >
                                        <h2>{device.toLowerCase()}</h2>
                                        <div
                                            key={`${device}${k}`}
                                            className={
                                                "flex flex-row justify-center items-center gap-2"
                                            }
                                        >
                                            {/*Print port group*/}
                                            {ports.map((port) => {
                                                let link = "fill-disabled";
                                                if (
                                                    port.link?.toLowerCase() ===
                                                    "up"
                                                )
                                                    link = "fill-primary-dark";
                                                return (
                                                    <div
                                                        key={`${role}-${port.num}`}
                                                    >
                                                        <PortsIcon
                                                            className={`h-7 w-7 ${link}`}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export const Wired = () => {
    const { data: status, isLoading } = useNodeStatus();

    const switches = status?.switch_status;

    return (
        <Section>
            <SectionTitle icon={<PortsIcon className={IconsClassName} />}>
                <Trans>Wired connections</Trans>
            </SectionTitle>
            <div className={"mt-4"}>
                {isLoading ? (
                    <span>Loading...</span>
                ) : switches.length ? (
                    <Ports switches={status.switch_status} />
                ) : (
                    <div className={"flex-1 flex justify-center"}>
                        No wired connections found
                    </div>
                )}
            </div>
        </Section>
    );
};
