//Will handle the logic of CRUD
const res = require("express/lib/response");
const Plant = require("../models/plant");

async function createPlant(req, res) {
  try {
    const plant = await new Plant(req.body);
    await plant.save();
    return res.status(201).json({
      plant,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getAllPlants(req, res) {
  try {
    const plants = await Plant.find();
    return res.status(200).json({ plants });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function getPlantById(req, res) {
  try {
    const { id } = req.params;
    const plant = await Plant.findById(id);
    if (plant) {
      return res.status(200).json({ plant });
    }
    return res.status(404).send(`Plant with the specified I does not exist`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function updatePlant(req, res) {
  try {
    const { id } = req.params;
    await Plant.findByIdAndUpdate(id, req.body, { new: true }, (err, plant) => {
      if (err) {
        res.status(500).send(err);
      }
      if (!plant) {
        res.status(500).send(`Plant not found!`);
      }
      return res.status(200).json({ plant });
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deletePlant(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Plant.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send(`Plant deleted`);
    }
    throw new Error(`Plant not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
module.exports = {
  createPlant,
  getAllPlants,
  getPlantById,
  updatePlant,
  deletePlant,
};
