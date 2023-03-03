import {Map} from 'ol'
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

export const baseInfoLayer: (source: VectorSource) => (map: Map) => VectorLayer<VectorSource> = (source) => {
    const layer = new VectorLayer({
        source
    })
    return (map) => {
        map.addLayer(layer);
        return layer;
    }
}