export const createObject = (
  x: number,
  y: number,
  id: string,
  templateId: string,
  path: string,
  properties: Record<string, unknown>,
): Record<string, unknown> => {
  const imgUrl = createImgUrl(path);
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

const getTakenPositions = () => {
  
}