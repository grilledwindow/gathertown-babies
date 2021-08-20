import { createObject } from "./object.ts";

// Adds coordinate objects to the map
export const createCoordinates = (
  objects: Array<Record<string, unknown>>,
  width: number,
  height: number,
  x_step: number,
  y_step: number,
) => {
  const DIR = "250x125";
  const TEMPLATE_ID = "coordinates";

  for (let x = 0; x < width; x += x_step) {
    for (let y = 0; y < height; y += y_step) {
      const id = `${x}x${y}`;
      const coordinates = createObject(
        x,
        y,
        0,
        TEMPLATE_ID,
        id,
        `${DIR}/${id}.png`,
        0,
        {},
      );
      objects.push(coordinates);
    }
  }
};
