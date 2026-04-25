'use server';

import { z } from "zod";
import postgres from "postgres";
import { State } from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = postgres(process.env.DATABASE_URL!);

/* =========================
   ZOD SCHEMA
========================= */

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  // ✅ Permite rutas tipo /images/cookies.jpg
  imageUrl: z.string().min(1, "Image is required"),
});

/* =========================
   CREATE PRODUCT
========================= */

export async function createProduct(
  _prevState: State,
  formData: FormData
) {
  const validatedFields = FormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    imageUrl: formData.get("imageUrl"), // ✅ FIX
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description, price, imageUrl } = validatedFields.data;

  try {
    await sql`
      INSERT INTO products (name, description, price, image_url)
      VALUES (${name}, ${description}, ${price}, ${imageUrl})
    `;
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      message: "Failed to create product.",
    };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

/* =========================
   DELETE PRODUCT
========================= */

export async function deleteProduct(id: number) {
  if (!id) {
    throw new Error("Invalid ID");
  }

  await sql`DELETE FROM products WHERE id = ${id}`;

  revalidatePath("/dashboard/products");
}

/* =========================
   UPDATE PRODUCT
========================= */

export async function updateProduct(
  _prevState: State,
  formData: FormData
) {
  const productId = Number(formData.get("id"));

  const validatedFields = FormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    imageUrl: formData.get("imageUrl"), // ✅ FIX CLAVE
  });

  if (!productId) {
    return { message: "Invalid product ID." };
  }

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description, price, imageUrl } = validatedFields.data;

  try {
    await sql`
      UPDATE products
      SET 
        name = ${name}, 
        description = ${description}, 
        price = ${price}, 
        image_url = ${imageUrl}
      WHERE id = ${productId}
    `;
  } catch (error) {
    console.error("Error updating product:", error);
    return { message: "Failed to update product." };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}