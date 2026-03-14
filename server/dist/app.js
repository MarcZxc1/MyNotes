import express, {} from "express";
import noteRoutes from "./routes/note.routes.js";
import cors from "cors";
const app = express();
app.use(cors({
    origin: (origin, callback) => {
        // Allow local development and any Vercel subdomain
        if (!origin ||
            origin.startsWith("http://localhost") ||
            origin.endsWith(".vercel.app")) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
app.use("/api/notes", noteRoutes);
app.use("/health", (req, res) => {
    res.send("<h4>Healthy!</h4>");
});
export default app;
//# sourceMappingURL=app.js.map