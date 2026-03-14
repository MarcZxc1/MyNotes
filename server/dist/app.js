import express from "express";
import noteRoutes from "../src/routes/note.routes.js";
import cors from "cors";
const app = express();
app.use(cors({
    // Origin must match exactly (no trailing slash).
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://my-notes-git-main-marxc1s-projects.vercel.app",
        "https://my-notes-iota-one.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
app.use("/api/notes", noteRoutes);
export default app;
//# sourceMappingURL=app.js.map