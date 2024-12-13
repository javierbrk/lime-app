import { Trans } from "@lingui/macro";

import style from "plugins/lime-plugin-mesh-wide/src/containers/style.less";
import { useLocateNode } from "plugins/lime-plugin-mesh-wide/src/hooks/useLocateNode";
import {
    getLocationQueryKey,
    useChangeLocation,
    useLocation,
} from "plugins/lime-plugin-mesh-wide/src/locateNodeQueries";
import { useSelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";

import queryCache from "utils/queryCache";

const LocateNode = ({}) => {
    const { editingLocation, setEditingLocation, mapRef } = useLocateNode();
    const { data: selectedMapFeature } = useSelectedMapFeature();

    const { data: nodeLocation, isLoading } = useLocation({});

    const { mutate: changeLocation, isLoading: submitting } = useChangeLocation(
        {
            onSettled: () => {
                queryCache.invalidateQueries(getLocationQueryKey);
                toogleEdition();
            },
        }
    );

    let stationLat = null;
    if (nodeLocation.location.lat !== "FIXME")
        stationLat = nodeLocation.location.lat;
    let stationLon = null;
    if (nodeLocation.location.lon !== "FIXME") {
        stationLon = nodeLocation.location.lon;
    }

    const hasLocation = stationLat && stationLon;
    const loaded = !isLoading && typeof stationLat !== "undefined";

    const toogleEdition = () => {
        setEditingLocation((prev) => !prev);
    };

    const confirmLocation = async () => {
        const position = mapRef.current.getCenter();
        changeLocation({ lat: position.lat, lon: position.lng });
    };

    if (!loaded || selectedMapFeature) {
        return null;
    }

    return (
        <div id="edit-action" className={style.editAction}>
            {editingLocation && (
                <button onClick={confirmLocation}>
                    <Trans>confirm location</Trans>
                </button>
            )}
            <button onClick={toogleEdition}>
                {editingLocation && <Trans>cancel</Trans>}
                {!editingLocation && hasLocation && (
                    <Trans>edit location</Trans>
                )}
                {!editingLocation && !hasLocation && (
                    <Trans>locate my node</Trans>
                )}
            </button>
        </div>
    );
};

export default LocateNode;
