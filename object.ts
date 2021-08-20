export const createObject = (
  x: number,
  y: number,
  type: number,
  id: string,
  templateId: string,
  path: string,
  properties: Record<string, unknown>,
): Record<string, unknown> => {
  const imgUrl = createImgUrl(path);
  return {
    type,
    width: 1,
    height: 1,
    scale: 1,
    id,
    x,
    y,
    normal: imgUrl,
    highlighted: imgUrl,
    templateId,
    color: "default",
    orientation: 0,
    properties,
    _name: id,
    _tags: ["Custom"],
  };
};

const createImgUrl = (path: string) => {
  return `https://raw.githubusercontent.com/grilledwindow/gathertown-babies/main/img/${path}`;
};

export const getTakenPositions = (
  objects: Array<Record<string, unknown>>,
): Set<[number, number]> => {
  const taken = new Set<[number, number]>();
  for (const object of objects) {
    taken.add([object.x as number, object.y as number]);
  }
  return taken;
};
