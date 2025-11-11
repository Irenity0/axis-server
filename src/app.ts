import express, { Application, Request, Response } from 'express';
const app : Application = express();

app.use(express.json())
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

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Axis server uwu",
  })
})

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Global Error:", error)
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  })
})

export default app