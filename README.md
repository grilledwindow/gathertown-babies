# gathertown-babies
I made this small project to automate the creation of my game, Find the Babies, on GatherTown. Normally, we hold an annual Boys' Brigade Character Quest camp a few weeks before the actual competition for our company, the 11th. However, due to the pandemic, we have to move almost everything online, so we're using GatherTown to host majority of the games.

This game is about finding babies (diapers) on a large mattress, which is just an 8000px * 4000px white PNG file. In GatherTown, this would mean a dimension of 250 * 125, which is huge and could get the Boys lost easily. I decided to create a coordinate system to prevent this, but this would require adding a lot of new objects, which is repetitive, tiring, and prone to human error. Therefore, I turned to GatherTown's API to programatically do this for me.

## Configuration
A `config.ts` file is needed in the same directory as this README.
```typescript
export const API_KEY = 'your-api-key'; // https://gather.town/apiKeys
export const SPACE_ID = 'your-space-id\\space-name'; // e.g. xxxx\\babies
export const MAP_ID = 'your-map-id'; // Room name, e.g. babies
```

## How it works
This project is run using Deno:
`deno run --allow-net --allow-read --allow-write index.ts`

[ImageScript](https://deno.land/x/imagescript@1.2.9) was used to create the coordinate PNGs. The images are hosted using GitHub, in this same repository, accessed using the raw GitHub user content link, as such: [https://raw.githubusercontent.com/grilledwindow/gathertown-babies/main/img/250x125/0x0.png](https://raw.githubusercontent.com/grilledwindow/gathertown-babies/main/img/250x125/0x0.png). Therefore, the images must be pushed to the repository before you can see changes on your GatherTown space.

## Attribution
The font I used for the coordinates is E4 2017 by 178Ulysees, from [https://fontstruct.com/fontstructions/show/1276352/e4_2017](https://fontstruct.com/fontstructions/show/1276352/e4_2017).
