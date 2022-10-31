const favProducts = document.querySelector("[data-form-favorite]");

async function fetchFavorite(){
   
    const token = localStorage.getItem("token");
    
    fetch("http://localhost:3001/user/favoriteFetch",{
        method: "POST",
        headers: {
            "Content-Type" : 'application/json',   
        },
        body : JSON.stringify( {token:token} )
    })
    .then(response =>{
       if(response.ok){
           return response.json()
       }
    })
    .then(data => {
        console.log(data)
        const favList = data
        console.log(favList)
        favoriteRendering(favList)
    })
}

   

function favoriteRendering(Product) {

    const productEl = Product.map(
        (product) => `
        <div class="bags">
        <img id="img-bag-${product.productDoc.id}"src="${product.productDoc.img}" alt="">
        <h3>Name:${product.productDoc.name}</h3>
        <h4>Price : ${product.productDoc.price}</h4>
        <h5>Brand :${product.productDoc.brand}</h5>
        <div class="stars">
        <button  class= "favbutton">
            <i class="fa fa-times" id="${product.productDoc._id}"></i>
        </button>
        </div>
    </div>
    `
    )

    favProducts.innerHTML = productEl.join("")

}

window.addEventListener("DOMContentLoaded", fetchFavorite());
const buttons = document.getElementsByClassName('auto-container');
console.log(buttons)

for(i=0; i<buttons.length; i++){
    buttons[i].addEventListener('click', (e)=>{
        console.log("hhheeeereeeee")
        console.log("event happened on", e.target.id);
        deletefavorite(e.target.id)
        window.location.reload()
    });

}


function deletefavorite(_id) {
    const token = localStorage.getItem("token");

    const body = {
        id: _id,
        token: token
    }

    fetch("http://localhost:3001/user/deleteFavorite", {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(body),
    })
    .then(response => {
        if(response.ok) {
            return response.json()
        }
    })
    .then(data => {
        console.log(data)
    })
     
}

