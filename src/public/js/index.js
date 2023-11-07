const socketClient = io();

const form = document.getElementById("form");


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
}
