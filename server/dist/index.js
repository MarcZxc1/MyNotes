import "dotenv/config";
import app from "./app.js";
const URL = process.env.RENDER_URL || "";
setInterval(async () => {
    try {
        const response = await fetch(URL);
        console.log(`Self-ping status: ${response.status} - Keep-alive successful`);
        const data = await response.json();
        console.log("Status: ", data);
    }
    catch (error) {
        console.error("Self-ping failed: ", error);
    }
}, 13 * 60 * 1000);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The server is running at Port ${PORT}`);
});
//# sourceMappingURL=index.js.map