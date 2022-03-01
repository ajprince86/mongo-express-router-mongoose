//Setting Up our express

const express = require(`express`);
const routes = require(`./routes`);
const db = require(`./db`);
const logger = require(`morgan`); //Debugger tool
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//They are parsing what we send back to the browser.
//We NEED THEM
app.use(logger(`dev`));

app.use(`/api`, routes);
db.on(`error`, console.error.bind(console, `MongoDB connection error:`));

app.listen(PORT, () => {
  console.log(`Listening on on port ${PORT}`);
});
