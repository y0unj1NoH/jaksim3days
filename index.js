import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import postsRoutes from "./routes/postsRoutes.js";
import { connectDB } from "./config/database.js";
import Posts from "./models/posts.js";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = fileURLToPath(new URL(".", import.meta.url));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/", postsRoutes);

async function init() {
  const db = await connectDB();
  await Posts.init(db);

  if (process.env.VERCEL) {
		console.log("Vercel 환경에서는 서버를 시작하지 않습니다.");
	} else {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:5000");
    });
	}

  process.on("SIGINT", async () => {
    try {
      await client.close();
      console.log("정상 DB 연결 종료");
      process.exit(0);
    } catch (err) {
      console.error("오류에 의한 DB 연결 종료", err);
      process.exit(1);
    }
  });
}

init();
