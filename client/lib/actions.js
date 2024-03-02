"use server";

const { revalidatePath } = require("next/cache");

export async function revalidate(path) {
  revalidatePath(path);
}
