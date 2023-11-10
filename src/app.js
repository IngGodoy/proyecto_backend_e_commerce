import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.route.js";
import {__dirname } from "./utils.js"
import handlebars from "express-handlebars";
import viewRouter from "./routes/views.router.js";
import {Server} from "socket.io";
import { ProductsManager} from "./manager/products.js";
import fs from "fs";


const productsManager = new ProductsManager();  

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.static(__dirname  + "/public"));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname  + '/views');
app.set('view engine', 'handlebars');


app.use('/', viewRouter);
app.use("/realtimeproducts", viewRouter);

app.use("/api/products", productsRouter);
app.use("/api/carts",cartsRouter); 

const httpServer = app.listen(PORT, ()=> console.log("server ok on port: " + PORT));
const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket)=>{
    console.log("usuario conectado");
    const readProducts = await productsManager.getProducts();
    console.log("productos backend al frontend", readProducts);
    socket.emit('connection', readProducts);
    
    socket.on("newProduct", async (product)=>{
        
        productsManager.addProduct(product);
        console.log("producto agregado en backend: ", product )

        const updateProducts = await productsManager.getProducts();
        const copyUpdateProducts = [... updateProducts];
        copyUpdateProducts.push(product);
        console.log("productos backend al frontend", copyUpdateProducts);
        socketServer.emit('arrayProducts', copyUpdateProducts);
    });

   
});




