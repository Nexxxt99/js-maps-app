import VectorSource from "ol/source/Vector";
import {pgSourceLoader} from "../services/data-storage.service";

export const pgSource: VectorSource = new VectorSource({})

pgSource.setLoader(pgSourceLoader(pgSource))

export const temporarySource = new VectorSource()