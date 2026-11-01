import app from "./app/app.js"
import { connectDatabase } from "./config/database.js"
import { connectToMessageBroker } from "./service/broker.service.js"
import { env } from "./config/env.js"


await connectDatabase()
await connectToMessageBroker()

app.listen(env.PORT,()=>{
    console.log(`Project Server is running on port ${env.PORT}`)
})
