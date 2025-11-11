import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`axis server ready on port http://localhost:${PORT} uwu`)
})

process.on("unhandledRejection", (err: any) => {
  console.error("Unhandled Promise Rejection:", err)
  process.exit(1)
})

process.on("uncaughtException", (err: any) => {
  console.error("Uncaught Exception:", err)
  process.exit(1)
})