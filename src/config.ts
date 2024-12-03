import Align from "plugins/lime-plugin-align";
import ChangeNode from "plugins/lime-plugin-changeNode";
import Fbw from "plugins/lime-plugin-fbw";
import Firmware from "plugins/lime-plugin-firmware";
import Locate from "plugins/lime-plugin-locate";
import MeshWide from "plugins/lime-plugin-mesh-wide";
import MeshConfigPage from "plugins/lime-plugin-mesh-wide-config";
import MeshUpgrade from "plugins/lime-plugin-mesh-wide-upgrade";
import Metrics from "plugins/lime-plugin-metrics";
import NetworkAdmin from "plugins/lime-plugin-network-admin";
import NodeAdmin from "plugins/lime-plugin-node-admin";
import Notes from "plugins/lime-plugin-notes";
import Pirania from "plugins/lime-plugin-pirania";
import RemoteSupport from "plugins/lime-plugin-remotesupport";
import Rx from "plugins/lime-plugin-rx";

// REGISTER PLUGINS
export const plugins: LimePlugin[] = [
    Rx,
    Align,
    Locate,
    MeshWide,
    Metrics,
    Notes,
    NodeAdmin,
    NetworkAdmin,
    Firmware,
    MeshUpgrade,
    ChangeNode,
    RemoteSupport,
    Pirania,
    MeshConfigPage,
    Fbw, // does not have menu item
];
