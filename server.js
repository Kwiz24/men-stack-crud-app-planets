const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose")
const methodOverride = require("method-override");
const morgan = require("morgan");

const app = express();

  const Planet = require("./models/planet.js");

  app.use(express.urlencoded({ extended: false }));
  app.use(methodOverride("_method"));
app.use(morgan("dev"));
 
  app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

  app.get("/olanets", async (req, res) => {
      const allPlanets = await Planet.find();
      res.render("index.ejs", {planets: allPlanets});
  });

  app.post("/planets", async (req, res) => {
    console.log(req.body);
    if(req.body.isReadyToView === "on"){
        req.body.isReadyToView = true
    }else {
       req.body.isReadyToView = false
    }
    const createdPlanet = await Planet.create(req.body);
      res.redirect('/planets');
  });

  app.get("/planets/new" , (req, res) => {
    res.render("planets/new.ejs");
  });

    app.get("/planets/:planetId", async (req, res) => {
    const foundPlanet = await Planet.findById(req.params.planetId);
    res.render("planets/show.ejs", { planet: foundPlanet });
  });

  app.delete("/planets/:planetId", async (req, res) => {
    await Planet.findByIdAndDelete(req.params.carId);
    res.redirect("/planet");
  });

  app.get("/planets/:planetId/edit", async (req, res) => {
    const foundPlanet = await Planet.findById(req.params.planetId);
    res.render("planets/edit.ejs", {
      planet: foundPlanet,
    });
  });

  app.put("/planets/:planetId", async (req, res) => {
    // Handle the 'isReadyToView' checkbox data
    if (req.body.isReadyToView === "on") {
      req.body.isReadyToView = true;
    } else {
      req.body.isReadyToView = false;
    }
    
    // Update the planet in the database
    await planet.findByIdAndUpdate(req.params.planetId, req.body);
  
    // Redirect to the planet's show page to see the updates
    res.redirect(`/planets/${req.params.planetId}`);
  });

app.listen(3001, () => {
  console.log("Listening on port 3001");
});

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });