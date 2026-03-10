import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("ryloc.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS parts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT,
    subcategory TEXT,
    image_url TEXT,
    car_models TEXT,
    ebay_url TEXT,
    core_charge REAL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT
  );

  CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    part_id INTEGER,
    quantity INTEGER DEFAULT 1,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(part_id) REFERENCES parts(id)
  );

  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT, -- 'contact' or 'engineering'
    name TEXT,
    email TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed data if empty
const partsCount = db.prepare("SELECT COUNT(*) as count FROM parts").get() as { count: number };
if (partsCount.count === 0) {
  const insertPart = db.prepare(`
    INSERT INTO parts (name, description, price, category, subcategory, image_url, car_models, core_charge)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const seedParts = [
    ["RYLOC W201 6 Cylinder Tachometer Assembly", "Complete, pre-tested tachometer assembly with our high-integrity board pre-installed. Designed for car enthusiasts looking to re-instate and fix the timeless look of your Benz gauge cluster. This is more than OEM—this ensures your tachometer works every time, all the time, and outlasts its owner.", 200.00, "Electronics", "Full Assembly", "https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg", "W201 (6 Cylinder)", 100.00],
    ["W201 OR W124 4 Cylinder Tachometer Board", "The UPGRADED W201/W124 4 Cylinder Tachometer Board with Unlimited Lifetime Warranty. A high-quality product built for enthusiasts who care about tolerances and a clean OEM+ aesthetic. Fits BOTH W201 AND W124 gas models.", 120.00, "Electronics", "Individual Boards", "https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg", "W201, W124 (4 Cylinder)", 0],
    ["RYLOC W124 4 Cylinder Tachometer Assembly", "Luxury-grade aftermarket upgrade built for the W124 4-cylinder. Featuring minimal branding, refined textures, and hardware that looks intentional. Plug-and-play solution with our upgraded board pre-installed.", 200.00, "Electronics", "Full Assembly", "https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg", "W124 (4 Cylinder)", 100.00],
    ["RYLOC W201 4 Cylinder Tachometer Assembly", "Precision-engineered tachometer assembly for the W201 4-cylinder. Measured mounting points ensure a perfect fit. Includes our signature upgraded board with lifetime reliability.", 200.00, "Electronics", "Full Assembly", "https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg", "W201 (4 Cylinder)", 100.00],
    ["RYLOC W124 6 Cylinder Tachometer Assembly", "The pinnacle of gauge cluster restoration for the W124 6-cylinder. Small-batch production ensures tight quality control and consistent finishes. Re-engineered to outlast the original factory component.", 200.00, "Electronics", "Full Assembly", "https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg", "W124 (6 Cylinder)", 100.00],
    ["W201 OR W124 6 Cylinder Tachometer Board", "Individual high-integrity board for 6-cylinder W201 and W124 models. Featuring modern surface-mount technology and an unlimited lifetime warranty. The best upgrades look inevitable.", 120.00, "Electronics", "Individual Boards", "https://montessoriinthewoods.org/wp-content/uploads/2018/02/image-placeholder-500x500.jpg", "W201, W124 (6 Cylinder)", 0]
  ];

  for (const part of seedParts) {
    insertPart.run(...part);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/parts", (req, res) => {
    const parts = db.prepare("SELECT * FROM parts").all();
    res.json(parts);
  });

  app.get("/api/parts/:id", (req, res) => {
    const part = db.prepare("SELECT * FROM parts WHERE id = ?").get(req.params.id);
    if (part) {
      res.json(part);
    } else {
      res.status(404).json({ error: "Part not found" });
    }
  });

  app.post("/api/submissions", (req, res) => {
    const { type, name, email, message } = req.body;
    const stmt = db.prepare("INSERT INTO submissions (type, name, email, message) VALUES (?, ?, ?, ?)");
    stmt.run(type, name, email, message);
    res.json({ success: true });
  });

  // Simple Auth (Mock for now, but real DB)
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password);
    if (user) {
      res.json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.post("/api/auth/register", (req, res) => {
    const { email, password, name } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO users (email, password, name) VALUES (?, ?, ?)");
      const result = stmt.run(email, password, name);
      res.json({ success: true, user: { id: result.lastInsertRowid, email, name } });
    } catch (e) {
      res.status(400).json({ error: "User already exists" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
