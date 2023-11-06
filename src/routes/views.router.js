import { Router } from "express";
import { ProductsManager} from "../manager/products.js";


const productsManager = new ProductsManager();  

const router = Router();

router.get("/home", async (request,response)=>{

    try{

        const products = await productsManager.getProducts();
        response.render('home', {products});

    }catch(error){
        response.status(500).json(error.message);
    }

    
});

export default router;