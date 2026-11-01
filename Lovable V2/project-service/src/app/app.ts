import router from "./index.routes.js"
import express from "express"
import morgan from "morgan"
import type { Request, Response } from "express"
import { errorHandler } from "../middlewares/error.middleware.js"

const app = express()
app.use(morgan("dev"))
app.use(express.json())

app.use("/api/projects", router)

app.get("/_status/healthz", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Server is Healthy"
    })
})

app.get("/_status/readyz", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Server is Healthy"
    })
})

app.use(errorHandler)

export default app