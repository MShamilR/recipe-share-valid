import express from "express";
import User from "../models/userModel.js";
import Recipe from "../models/recipeModel.js";
import Rating from "../models/ratingModel.js";
import { errorHandler } from "../utils/errorHandler.js";

const router = express.Router();

// Create New Recipe
export const getAllRecipes = async (req, res, next) => {
  // TODO: implement average ratings and comments fetching
    //   const recipies = await Recipe.find({});
    const recipies = await Recipe.find({}).populate("user")
  res.status(200).json(recipies);
};

export const getRecipe = async (req, res, next) => {
  // TODO: implement average ratings and comments fetching
  const recipe = await Recipe.findById(req.params.id).populate("user");
  res.status(200).json(goals);
};

export const addRecipe = async (req, res, next) => {
  const { title, ingredients, instructions, cookingTime } = req.body;
  if (!title || !ingredients || !instructions || !cookingTime) {
    return next(errorHandler(400, "Send all required fields"));
  }
  const user = await User.findById(req.user.id);
  console.log(user);
  try {
    const addedRecipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      cookingTime,
      user: user._id,
    });
    res.status(200).json(addedRecipe);
  } catch (error) {
    next(error);
  }
};

export const updateRecipe = async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return next(errorHandler(400, "Recipe not found"));
  }
  if (!req.user) {
    return next(errorHandler(400, "User not found"));
  }
  if (req.user.id !== recipe.user.toString()) {
    return next(errorHandler(401, "User not authorised"));
  }

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedRecipe);
  } catch (error) {
    next(error);
  }
};

export const deleteRecipe = async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return next(errorHandler(400, "Recipe not found"));
  }
  if (!req.user) {
    return next(errorHandler(400, "User not found"));
  }
  if (req.user.id !== recipe.user.toString()) {
    return next(errorHandler(401, "User not authorised"));
  }
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json("RECIPE_DELETED");
  } catch (error) {
    next(error);
  }
};
