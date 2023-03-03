import {Map, View} from 'ol'
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import {defaults as defaultControls} from 'ol/control.js';
import './style/styles.scss'
import {pointDrawInteraction} from "./interactions/draw.interaction";
import {baseInfoLayer} from "./layers/base-info.layer";
import {pgSource, temporarySource} from "./sources/postgres.source";
import {popup} from "./components/popover.component";

const INIT_CENTER = [3987999.487129461, 6252324.706026093]

const map = new Map({
    target: 'map-container',
    layers: [
        /* @todo: add layers switcher */
        /*new TileLayer({
            source: new XYZ({
                url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
            }),
        }),*/
        new TileLayer({
            source: new OSM()
        }),
    ],
    view: new View({
        center: INIT_CENTER,
        zoom: 7,
        multiWorld: false
    }),
    controls: defaultControls({zoom: false, attribution: false, rotate: false})
});

map.addOverlay(popup)

baseInfoLayer(pgSource)(map)
pointDrawInteraction(temporarySource)(map)




