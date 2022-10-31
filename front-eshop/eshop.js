const divProducts = document.querySelector("[data-form-eshop]");


async function fetchData(){

    fetch("http://localhost:3001/user/fetchProducts")
    .then((res) => res.json())
    .then((product) => {
        console.log(product)
        productRendering(product)
    
    })
        
}

function setFav(bagsId){
    const token = localStorage.getItem("token");
    console.log("JWT: ",token)
    
    console.log(bagsId)
    const body = {
        id: bagsId,
        token: token
    }
    console.log(body)
    fetch("http://localhost:3001/user/favoriteProducts",{
        method: "POST",
        headers: {
            "Content-Type" : 'application/json',
        },
        body : JSON.stringify(body)
    })
    .then(res =>{
       console.log(res)  
    })
    

}


function productRendering(Product) {

    const productEl = Product.map(
        (product) =>
         `
        <div class="bags">
        <img id="img-bag-${product.id}"src="${product.img}" alt="">
        <h3>Name:${product.name}</h3>
        <h4>Price : ${product.price}</h4>
        <h5>Brand :${product.brand}</h5>
        <div class="stars">
            <button class= "favButton">
                <i onclick="myFunction(this)" class="fa fa-star-o" id="${product._id}"></i>
            </button>

        </div>
    </div>
    `
    )

    divProducts.innerHTML = productEl.join("")

}

window.addEventListener("DOMContentLoaded", fetchData());

function myFunction(x) {
    x.classList.toggle("fa-heart-o");

}


const buttons = document.getElementsByClassName('auto-container');


for(i=0; i<buttons.length; i++){
    buttons[i].addEventListener('click', (e)=>{
        console.log("event happened on", e.target.id);
        setFav(e.target.id)
      });

}

