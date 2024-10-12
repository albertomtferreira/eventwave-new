"use server"

import { CreateCategoryParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Category from "../database/models/category.mode"


export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
  try {
    await connectToDatabase();

    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error)
  }
}

export const getAllCategories = async () => {
  try {
    await connectToDatabase();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error)
  }
}

// TODO
// Validate if category to be deleted is part of any active event
export const deleteCategory = async (categoryId: string): Promise<any> => {
  try {
    await connectToDatabase()
    const deletedCategory = await Category.findByIdAndDelete(categoryId)
    if (!deletedCategory) {
      throw new Error('Category not found')
    }

    return JSON.parse(JSON.stringify(deletedCategory))
  } catch (error) {
    handleError(error)
  }
}