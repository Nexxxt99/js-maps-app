import axios from "axios";
import WKT from "ol/format/WKT";
import {FeatureLoader} from "ol/featureloader";
import {Feature} from "ol";
import VectorSource from "ol/source/Vector";


export const pgSourceLoader: (source: VectorSource) => FeatureLoader = (source: VectorSource) => async (extent, upp, projection, successCallback, errorCallback) => {

    const {data} = await axios({
        method: 'GET',
        url: 'http://localhost:3000/getObjects',
        headers: {Accept: '*',}
    })
    const rawFeatures: Feature[] = data?.map((e: { coords: string }) => {
        console.log(e.coords, new WKT().readFeature(e.coords))
        return new WKT().readFeature(e.coords)
    })

    source.addFeatures(rawFeatures)
    if (rawFeatures && successCallback) {
        successCallback(rawFeatures)
    } else {
        errorCallback && errorCallback()
    }
}


export const pgSourceSaver = async (coords: string, info: string) => {

    const response = await axios({
        method: 'POST',
        url: 'http://localhost:3000/saveObject',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            coords,
            info
        }
    })
}