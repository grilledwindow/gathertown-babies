import { API_KEY, MAP_ID, SPACE_ID } from "./config.ts";
import { createCoordinates } from "./coordinates.ts";
import { createBackground, createPNGs } from "./img.ts";
import {
  clearAllDiapers,
  createExistingDiapers,
  createFakeDiapers,
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

const createNewMap = () => {
  const [width, height] = [100, 50];
  const nFakes = 50; // No. of fake diapers

  createBackground(mapContent, width, height);
  mapContent.objects = []; // Empty objects. Only use if you want to remove all the objects

  createPNGs(width, height, X_STEP, Y_STEP); // Create the coordinate images
  createCoordinates(mapContent.objects, width, height, X_STEP, Y_STEP);

  clearAllDiapers(mapContent.objects); // Remove all diapers

  // Create new diapers - creates new CSV too
  const diapers = createNewDiapers(mapContent.objects, width, height);
  mapContent.objects.push(...diapers);

  // Create diapers from existing CSV
  // createExistingDiapers(mapContent.objects);

  // Create fake diapers without notes
  let fakeDiapers = createFakeDiapers(
    mapContent.objects,
    width,
    height,
    nFakes,
    false,
  );
  mapContent.objects.push(...fakeDiapers);

  // Create fake diapers with notes
  fakeDiapers = createFakeDiapers(
    mapContent.objects,
    width,
    height,
    nFakes,
    true,
  );
  mapContent.objects.push(...fakeDiapers);

  setMap(mapContent);
};

createNewMap();