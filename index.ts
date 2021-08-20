import { API_KEY, MAP_ID, SPACE_ID } from "./config.ts";
import { createCoordinates } from "./coordinates.ts";
import { createPNGs } from "./img.ts";
import {
  clearAllDiapers,
  createExistingDiapers,
  createNewDiapers,
} from "./diapers.ts";

const X_STEP = 20;
const Y_STEP = 10;

const setMap = (mapContent: Record<string, unknown>) => {
  const body = {
    apiKey: API_KEY,
    spaceId: SPACE_ID,
    mapId: MAP_ID,
    mapContent: mapContent,
  };
  return fetch("https://gather.town/api/setMap", {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
};

const response = await fetch(
  `https://gather.town/api/getMap?apiKey=${API_KEY}&spaceId=${SPACE_ID}&mapId=${MAP_ID}`,
);
const mapContent = await response.json();
const [width, height] = mapContent.dimensions;

mapContent.objects = []; // Empty objects. Only use if you want to remove all the objects

createPNGs(width, height, X_STEP, Y_STEP); // Create the coordinate images
createCoordinates(mapContent.objects, width, height, X_STEP, Y_STEP);

clearAllDiapers(mapContent.objects); // Remove all diapers
const diapers = createNewDiapers(mapContent.objects, width, height);
mapContent.objects.push(...diapers);
// createExistingDiapers(mapContent.objects);

setMap(mapContent);
