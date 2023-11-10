const socketClient = io();

const form = document.getElementById("form");
const products = document.getElementById("list-products"); // id de div para colocar los productos

form.onsubmit = (element) =>{
    element.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const code = document.getElementById("code").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    const status = document.getElementById("status").value;
    
    const newPrduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status
    };

    socketClient.emit("newProduct", newPrduct);
    document.getElementById("form").reset();
    
    socketClient.on('arrayProducts', (productsArray)=>{
        products.innerHTML = "";
        let infoProducts = '';
        console.log("productos del lado del front", productsArray); //borrar
        productsArray.forEach(product=>{
            infoProducts += `Nombre Producto: ${product.title} - Precio: $${product.price} - Codigo: ${product.code} - Stock: ${product.stock} unidades </br> </br>`
        });
        products.innerHTML = infoProducts;
        
    });

};

socketClient.on('connection', (productsArray)=>{
    let infoProducts = '';
    productsArray.forEach(product=>{
        infoProducts += `Nombre Producto: ${product.title} - Precio: $${product.price} - Codigo: ${product.code} - Stock: ${product.stock} unidades </br> </br>`
    });
    products.innerHTML = infoProducts;
    console.log("termine de actualizar") //borrar
});


 