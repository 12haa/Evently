"use server";

import { CreateCategoryParams } from "@/types";
import { handleError } from "@/lib/utils";
import { connectToDatabase } from "@/lib/mongodb/database";
import Category from "@/lib/mongodb/database/models/category.model";

// CREATE category
export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase();
    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (err) {
    handleError(err);
  }
};
// FETCH category

export const getAllCategories = async () => {
  try {
    await connectToDatabase();
    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (err) {
    handleError(err);
  }
};
