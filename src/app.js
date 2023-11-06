import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.route.js";
import {__dirname } from "./utils.js"
import handlebars from "express-handlebars";
import viewRouter from "./routes/views.router.js";

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.static(__dirname  + "/public"));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname  + '/views');
app.set('view engine', 'handlebars');
app.use(express.urlencoded({extended:true})); //configurando Express para que analice y convierta los datos enviados desde un formulario HTML codificado en formato URL

app.use('/', viewRouter);

app.use("/api/products", productsRouter);
app.use("/api/carts",cartsRouter); 

app.listen(PORT, ()=> console.log("server ok on port: " + PORT));




