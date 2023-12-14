import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.get("/artists", async (request, response) => {
  const data = await fs.readFile("data.json");
  const artist = JSON.parse(data);
  response.json(artist);
});

app.get("/artists/:id", async (request, response) => {
  console.log(request.params);
  const artistId = Number(request.params.id);
  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);
  const result = artists.find((artist) => artist.id == artistId);
  response.json(result);
});

app.post("/artists", async (request, response) => {
  const newArtist = request.body;
  newArtist.id = new Date().getTime();
  console.log(newArtist);
  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  artists.push(newArtist);
  console.log(newArtist);
  fs.writeFile("data.json", JSON.stringify(artists));
  response.json(artists);
});

app.put("/artists/:id", async (request, response) => {
  const id = request.params.id;
  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  let updatedArtists = artists.find((artist) => artist.id == id);

  const body = request.body;
  updatedArtists.name = body.name;
  updatedArtists.birthDate = body.birthDate;
  updatedArtists.activeSince = body.activeSince;
  updatedArtists.genres = body.genres;
  updatedArtists.labels = body.labels;
  updatedArtists.website = body.website;
  updatedArtists.image = body.image;
  updatedArtists.shortDescription = body.shortDescription;

  fs.writeFile("data.json", JSON.stringify(artists));
  response.json(updatedArtists);
});
app.delete("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);

  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  const newartists = artists.filter((user) => user.id !== id);
  fs.writeFile("data.json", JSON.stringify(newartists));

  response.json(artists);
});
