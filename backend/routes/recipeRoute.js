import express from "express";
import { getAllRecipes,getRecipe,addRecipe, updateRecipe, deleteRecipe } from "../controllers/recipecontroller.js";
import { authorise } from "../utils/authorise.js";
import Recipe from "../models/recipeModel.js";

const router = express.Router();

router.get("/", getAllRecipes)
router.get("/:id", getRecipe);
router.post("/", authorise, addRecipe);
router.put("/:id", authorise, updateRecipe);
router.delete("/:id", authorise, deleteRecipe);

// Create New Recipe
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.ingredients ||
      !request.body.instructions ||
      !request.body.cookingTime
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: title, ingredients, instructions, cookingTime",
      });
    }
    const newRecipe = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Recipe.create(newRecipe);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get("/", async (request, response) => {
  try {
    const books = await Recipe.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Recipe from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Recipe.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Recipe
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = request.params;

    const result = await Recipe.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Recipe not found" });
    }

    return response
      .status(200)
      .send({ message: "Recipe updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Recipe.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Recipe not found" });
    }

    return response
      .status(200)
      .send({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
