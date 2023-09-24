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

app.get("/test", (request, response) => {
  response.send("Godaften herre");
});

app.get("/artists", async (request, response) => {
  const data = await fs.readFile("data.json");
  const artist = JSON.parse(data);
  console.log(artist);
  response.json(artist);
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
  console.log(id);
  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  let userToUpdate = artists.find((user) => user.id === Number(id));
  const body = request.body;
  console.log(body);
  userToUpdate.image = body.image;
  userToUpdate.mail = body.mail;
  userToUpdate.name = body.name;
  userToUpdate.title = body.title;

  fs.writeFile("data.json", JSON.stringify(artists));
  response.json(artists);
});

app.delete("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);

  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  const newartists = artists.filter((user) => user.id !== id);
  fs.writeFile("data.json", JSON.stringify(newartists));

  response.json(artists);
});
