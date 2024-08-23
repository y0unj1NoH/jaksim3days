import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDB  from "./config/database.js";
import postsRoutes from "./routes/postsRoutes.js";
import Posts from "./models/posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/", postsRoutes);

async function init() {
  const client = await connectDB();
  await Posts.init(client);

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
export default app;
