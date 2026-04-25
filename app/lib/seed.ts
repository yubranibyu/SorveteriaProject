import postgres from "postgres";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// 🔐 Safety check
if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined in .env");
}

const sql = postgres(process.env.DATABASE_URL);

async function seed() {
  try {
    console.log("🌱 Starting database seed...");

    // =========================
    // CLEAN TABLES
    // =========================
    await sql`
      TRUNCATE reviews, delivery_drivers, products, users 
      RESTART IDENTITY CASCADE
    `;

    // =========================
    // USERS
    // =========================
    const hashedPassword = await bcrypt.hash("123456", 10);

    const users = await sql<{ id: number }[]>`
      INSERT INTO users (name, email, password, role)
      VALUES
      ('Admin', 'admin@icecream.com', ${hashedPassword}, 'admin'),
      ('Maria', 'maria@icecream.com', ${hashedPassword}, 'customer'),
      ('Carlos', 'carlos@icecream.com', ${hashedPassword}, 'customer')
      RETURNING id
    `;

    console.log("✅ Users inserted");

    // =========================
    // PRODUCTS
    // =========================
    const products = await sql<{ id: number }[]>`
      INSERT INTO products (name, description, price, image_url, stock)
      VALUES
      ('Chocolate Ice Cream', 'Rich chocolate flavor', 5.99, '/images/chocolate.jpg', 20),
      ('Vanilla Ice Cream', 'Classic vanilla taste', 4.99, '/images/vanilla.jpg', 30),
      ('Strawberry Ice Cream', 'Fresh strawberry delight', 6.49, '/images/strawberry.jpg', 15),
      ('Cookies & Cream', 'Creamy with cookie chunks', 6.99, '/images/cookies.jpg', 10)
      RETURNING id
    `;

    console.log("✅ Products inserted");

    // =========================
    // DELIVERY DRIVERS
    // =========================
    await sql`
      INSERT INTO delivery_drivers (name, phone, is_active)
      VALUES
      ('Ana Rodriguez', '123456789', true),
      ('Luis Fernandez', '987654321', true)
    `;

    console.log("✅ Delivery drivers inserted");

    // =========================
    // REVIEWS
    // =========================
    await sql`
      INSERT INTO reviews (user_id, product_id, rating, comment)
      VALUES
      (${users[1].id}, ${products[0].id}, 5, 'Amazing flavor!'),
      (${users[2].id}, ${products[1].id}, 4, 'Very good classic taste'),
      (${users[1].id}, ${products[2].id}, 5, 'My favorite!')
    `;

    console.log("✅ Reviews inserted");

    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error during seed:", error);
  } finally {
    await sql.end();
    process.exit(0);
  }
}

seed();
