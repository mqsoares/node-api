import express from "express";
import connectDB from "./db/db.js";
import UserRoutes from "./routes/UserRoutes.js"
import ProductRoutes from "./routes/ProductRoutes.js"

const app = express();
app.use(express.json());

app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);

connectDB().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server listen in port ${process.env.PORT}`);
    });
});
