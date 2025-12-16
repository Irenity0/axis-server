/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application } from 'express';
import tasksRoutes from "./modules/tasks/tasks.routes"
const app : Application = express();
import cors from "cors"

app.use(express.json())
app.use(cors({
  origin: ["https://projectaxis.vercel.app"]
}));
app.use(express.urlencoded({ extended: true }))

// Catch invalid JSON
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON payload. Please fix your request body.",
    })
  }
  next(err)
})

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Axis server is running uwu",
    timestamp: new Date().toISOString(),
  })
})

app.use("/api/tasks", tasksRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Axis server uwu",
  })
}) 

app.use(/.*/, (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  })
})

// Global error handler
app.use((error: any, req: express.Request, res: express.Response) => {
  console.error("Global Error:", error)
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  })
})

export default app