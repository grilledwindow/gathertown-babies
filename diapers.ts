// import { readCSV } from "https://deno.land/x/csv/mod.ts";
import { createObject, getTakenPositions } from "./object.ts";

const TEXT = "Abram was eighty-six years old when Hagar bore him Ishmael.";
const FILE = "./diapers.csv";

const IMG_PATH = "diaper.png";
const TEMPLATE_ID = "diaper";
const TYPE = 6;

export const createNewDiapers = (
  objects: Array<Record<string, unknown>>,
  width: number,
  height: number,
) => {
  Deno.writeTextFileSync(FILE, "id,letter,x,y\n");

  const newObjects = new Array<Record<string, unknown>>();
  const taken = getTakenPositions(objects);
  const diapers = new Set<[number, number]>();
  diapers.add([10, 10]);

  let wordCount = 10;
  for (const word of TEXT.split(" ")) {
    for (const char of word) {
      let position;
      while (true) {
        position = generatePosition(width, height);
        if (
          !taken.has(position) && !diapers.has(position) &&
          isDiaperFar(diapers, position, 20)
        ) {
          diapers.add(position);
          break;
        }
      }

      const [x, y] = position;
      const id = "" + wordCount + Math.floor(Math.random() * 10000);

      Deno.writeTextFileSync(FILE, `${id},${char},${x},${y}\n`, {
        append: true,
      });

      const diaper = createObject(
        x,
        y,
        TYPE,
        `diaper-${id}`,
        TEMPLATE_ID,
        IMG_PATH,
        {
          message: id,
        },
      );

      newObjects.push(diaper);
    }
    wordCount++;
    Deno.writeTextFileSync(FILE, "\n", { append: true });
  }
  return newObjects;
};

// Adds existing diapers from csv file
export const createExistingDiapers = (
  objects: Array<Record<string, unknown>>,
) => {
  const contents = Deno.readTextFileSync(FILE);
  const lines = contents.split("\n");

  lines.splice(0, 1);

  for (const line of lines) {
    if (line === "") {
      console.log(line);
      continue;
    }

    const [id, _, _x, _y] = line.split(",");
    const x = _x as unknown as number;
    const y = _y as unknown as number;

    objects.push(
      createObject(x, y, TYPE, `diaper-${id}`, TEMPLATE_ID, IMG_PATH, {
        message: id,
      }),
    );
  }
};

// Generates a random [x, y] position
const generatePosition = (width: number, height: number): [number, number] => {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);
  return [x, y];
};

// Checks if a diaper is outside radius
const isDiaperFar = (
  diapers: Set<[number, number]>,
  position: [number, number],
  radius: number,
): boolean => {
  const [x, y] = position;
  const r = radius;

  for (const [x1, y1] of diapers) {
    if (Math.abs(x1 - x) < r && Math.abs(y1 - y) < r) {
      return false;
    }
  }
  return true;
};

export const clearAllDiapers = (
  objects: Array<Record<string, unknown>>,
) => {
  let lastDiaperIndex = 0;
  let diaperCount = 0;
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].templateId === "diaper") {
      lastDiaperIndex = i;
      diaperCount++;
    }
  }
  objects.splice(lastDiaperIndex - diaperCount + 1, diaperCount);
};
