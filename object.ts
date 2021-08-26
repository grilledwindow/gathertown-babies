export const createObject = (
  x: number,
  y: number,
  type: number,
  id: string,
  templateId: string,
  path: string,
  distThreshold: number,
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
    distThreshold,
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

export const createImgUrl = (path: string) => {
  return `https://raw.githubusercontent.com/grilledwindow/gathertown-babies/main/img/${path}`;
};

export class TakenSet extends Set {
  add(coordinates: [number, number]) {
    return super.add(coordinates.toString());
  }
  has(coordinates: [number, number]) {
    return super.has(coordinates.toString());
  }
  get(coordinates: string) {
    const [x, y] = coordinates.split(',');
    return ([Number(x), Number(y)])
  }
}

export const getTakenPositions = (
  objects: Array<Record<string, unknown>>,
  includesTemplateName?: string,
): TakenSet => {
  const taken = new TakenSet();

  if (!includesTemplateName) {
    for (const object of objects) {
      taken.add([object.x as number, object.y as number]);
    }
  } else {
    for (const object of objects) {
      if (
        (object.templateId as string).includes(includesTemplateName as string)
      ) {
        taken.add([object.x as number, object.y as number]);
      }
    }
  }

  return taken;
};
