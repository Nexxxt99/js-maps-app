import {Map, View} from 'ol'
import TileLayer from "ol/layer/Tile";
import {XYZ} from "ol/source";
import React, {useEffect} from "react";

const MapComponent:React.FC = () => {

    const map = new Map({
        target: 'map-container',
        layers: [
            new TileLayer({
                source: new XYZ({
                    url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
                }),
            }),
        ],
        view: new View({
            center: [0, 0],
            zoom: 2,
        }),
    });

    return <span></span>;
}

export default MapComponent;