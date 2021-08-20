// Adds coordinate objects to the map
export const createCoordinates = (
  objects: Array<Record<string, unknown>>,
  width: number,
  height: number,
  x_step: number,
  y_step: number,
) => {
  for (let x = 0; x < width; x += x_step) {
    for (let y = 0; y < height; y += y_step) {
      objects.push(createCoordinate(x, y));
    }
  }
};

// Creates a coordinate object. The image used is stored in the GitHub repository.
const createCoordinate = (
  x: number,
  y: number,
): Record<string, unknown> => {
  const id = `${x}x${y}`;
  const imgUrl =
    `https://raw.githubusercontent.com/grilledwindow/gathertown_babies/main/img/250x125/${id}.png`;
  return {
    type: 0,
    width: 1,
    height: 1,
    scale: 1,
    id,
    x,
    y,
    normal: imgUrl,
    highlighted: imgUrl,
    templateId: id,
    color: "default",
    _tags: ["Custom"],
    orientation: 0,
    offsetX: 0,
    offsetY: 0,
    properties: {},
    _name: id,
  };
};
