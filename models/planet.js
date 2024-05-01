const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
    name: String,
    isReadyToView: Boolean,
});

const Planet = mongoose.model("Planet", planetSchema);

module.exports = Planet;