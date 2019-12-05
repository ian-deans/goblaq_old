const mbxClient = require("@mapbox/mapbox-sdk");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
import config from "../../config/mapbox";

const baseClient = mbxClient({accessToken: config.reverse_geocoding_api_key})
export const geocodingClient = mbxGeocoding(baseClient);

