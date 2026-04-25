import postgres from 'postgres';
import { Product } from './definitions';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

/* =========================
   TYPES
========================= */
type DbProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
};

/* =========================
   MAPPER
========================= */
function mapProduct(row: DbProduct): Product {
  return {
    id: Number(row.id),
    name: row.name,
    description: row.description,
    price: Number(row.price),
  };
}

/* =========================
   GET ALL PRODUCTS
========================= */
export async function getProducts(): Promise<Product[]> {
  try {
    const data = await sql<DbProduct[]>`
      SELECT id, name, description, price FROM products
    `;
    return data.map((row: any) => ({
  id: Number(row.id),
  name: row.name,
  description: row.description,
  price: Number(row.price),
  imageUrl: row.image_url, 
}));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products.");
  }
}

/* =========================
   GET PRODUCT BY ID
========================= */
export async function getProductById(id: number): Promise<Product | null> {
  try {
    const data = await sql<DbProduct[]>`
      SELECT id, name, description, price 
      FROM products 
      WHERE id = ${id}
    `;

    if (data.length === 0) return null;

    return mapProduct(data[0]);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product.");
  }
}

/* =========================
   CREATE PRODUCT
========================= */
export async function createProduct(
  product: Omit<Product, 'id'>
): Promise<Product> {
  try {
    const data = await sql<DbProduct[]>`
      INSERT INTO products (name, description, price)
      VALUES (${product.name}, ${product.description}, ${product.price})
      RETURNING id, name, description, price
    `;

    return mapProduct(data[0]);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create product.");
  }
}

/* =========================
   UPDATE PRODUCT
========================= */
export async function updateProduct(
  id: number,
  product: Partial<Omit<Product, 'id'>>
): Promise<Product | null> {
  try {
    const existing = await getProductById(id);
    if (!existing) return null;

    const data = await sql<DbProduct[]>`
      UPDATE products SET
        name = ${product.name ?? existing.name},
        description = ${product.description ?? existing.description},
        price = ${product.price ?? existing.price}
      WHERE id = ${id}
      RETURNING id, name, description, price
    `;

    return mapProduct(data[0]);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update product.");
  }
}

/* =========================
   DELETE PRODUCT
========================= */
export async function deleteProduct(id: number): Promise<boolean> {
  try {
    const result = await sql`
      DELETE FROM products WHERE id = ${id}
    `;

    return result.count > 0;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete product.");
  }
}

/* =========================
   SEARCH PRODUCTS
========================= */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const data = await sql<DbProduct[]>`
      SELECT id, name, description, price
      FROM products
      WHERE name ILIKE ${'%' + query + '%'}
    `;

    return data.map(mapProduct);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to search products.");
  }
}

