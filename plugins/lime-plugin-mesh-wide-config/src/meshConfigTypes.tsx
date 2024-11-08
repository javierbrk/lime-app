export type ConfigItemType = string | string[];

export interface IMeshWideSection {
    [key: string]: ConfigItemType;
}

export type IMeshWideConfig = {
    [section: string]: IMeshWideSection;
};

export type GetCommunityConfigResponse = {
    file_contents: string;
};

export type MainNodeStatusType = "NO" | "MAIN_NODE";

export type ConfigUpdateState =
    | "DEFAULT" // When no config has changed
    | "WORKING" // when a user starts changing the config
    | "READY_FOR_APPLY" //the config is set in the node and is ready to reboot
    | "RESTART_SCHEDULED" // the node will reboot in xx seconds
    | "CONFIRMATION_PENDING" // the node rebooted and the configuration is not confirmed
    | "CONFIRMED" // the configuration has been set and the user was able to confirm the change
    | "ERROR"
    | "ABORTED";

export interface NodeMeshConfigInfo {
    timestamp: string;
    main_node: MainNodeStatusType;
    error: string;
    node_ip: string;
    transaction_state: ConfigUpdateState;
    current_config_hash: string;
    safe_restart_remining: number;
    retry_count: number;
    safe_restart_start_time_out: number;
    safe_restart_start_mark: number;
    board_name: string;
    safe_restart_confirm_timeout: number;
}

export type MeshWideNodeConfigInfo = {
    bleachTTL: number;
    author: string;
} & NodeMeshConfigInfo;

export interface MeshWideConfigState {
    [key: string]: MeshWideNodeConfigInfo;
}

export type StepperState =
    | "INITIAL" // No transaction
    | "TRANSACTION_STARTED" // Transaction initiated and sharing new configuration
    | "SENDING_START_SCHEDULE" // Sending start to start the safe_reboot
    | "UPGRADE_SCHEDULED" // Upgrade scheduled
    | "UPGRADING" // Doing the upgrade
    | "CONFIRMATION_PENDING" // Upgrade done, confirmation pending.
    | "SENDING_CONFIRMATION" // Sending confirmation to confirm the upgrade
    | "CONFIRMED" // Upgrade done, confirmed.
    | "ERROR" // Error
    | "ABORTING"; // Aborting
