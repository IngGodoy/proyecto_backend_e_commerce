import { Router, request, response } from "express";
import { ProductsManager} from "../manager/products.js";


const productsManager = new ProductsManager();  

const router = Router();

router.get("/home", async (request,response)=>{

    try{

        const products = await productsManager.getProducts();
        response.render('home', {products});

    }catch(error){
        response.status(500).json(error.message);
    };
});

router.get("/realtimeproducts", (request, response)=>{
    response.render("realTimeProducts");
});



export default router;