import {
  Image,
  TextLayout,
} from "https://deno.land/x/imagescript@1.2.9/ImageScript.js";

import { createImgUrl } from "./object.ts";

// Creates white background image for map
export const createBackground = (
  map: Record<string, unknown>,
  width: number,
  height: number,
) => {
  const file = ensureImgDir() + "background.png";
  new Image(width * 32, height * 32).fill(0xffffffff).encode()
    .then((data: Uint8Array) => {
      Deno.writeFile(file, data);
    });
  map.backgroundImagePath = createImgUrl(file);
};

// Creates coordinate PNGs to be stored in ./img/{width}x{height}/{x}x{y}.png
export const createPNGs = (
  width: number,
  height: number,
  x_step: number,
  y_step: number,
) => {
  const dir: string = ensureImgDir(`${width}x${height}`);
  const font: Uint8Array = Deno.readFileSync("./font/E4 2017.ttf");
  const textLayout = new TextLayout({
    maxWidth: 32,
    verticalAlign: "right",
    horizontalAlign: "middle",
  });

  for (let x = 0; x < width; x += x_step) {
    for (let y = 0; y < height; y += y_step) {
      const img: Image = new Image(32, 32);
      const textX: Image = createText(x, font, textLayout);
      const textY: Image = createText(y, font, textLayout);

      // Add text to image
      img.composite(textX, 31 - textX.width, 1)
        .composite(textY, 31 - textY.width, 16)
        .encode()
        .then((data: Uint8Array) =>
          Deno.writeFile(`${dir}/${x}x${y}.png`, data)
        );
    }
  }
};

// Creates text
const createText = (
  coordinate: number,
  font: Uint8Array,
  textLayout: TextLayout,
): Image => Image.renderText(font, 16, coordinate + "", 0x000000ff, textLayout);

// Creates img directory and directory to store images if they don't exist
const ensureImgDir = (filePath?: string) => {
  const dir = `./img/${filePath ?? ""}`;
  try {
    Deno.statSync("./img");
  } catch {
    Deno.mkdirSync("./img");
  }
  try {
    Deno.statSync(dir);
  } catch {
    Deno.mkdirSync(dir);
  }
  return dir;
};
