import {Draw} from "ol/interaction";
import {Map} from "ol";
import VectorSource from "ol/source/Vector";
import {Point} from "ol/geom";
import {popup, popupContainer, renderPopover} from "../components/popover.component";
import {WKT} from "ol/format";

export const pointDrawInteraction: (source: VectorSource) => (map: Map) => Draw = (source) => {
    const draw = new Draw({
        source,
        type: "Point",
    })

    draw.on("drawend", (evt) => {
        const {feature} = evt
        const coords = (feature.getGeometry() as Point).getCoordinates()

        popup.setPosition(coords)
        renderPopover(popup.getElement()!, new WKT().writeFeature(feature))
    })

    return (map: Map) => {
        map.addInteraction(draw)
        return draw
    }
}