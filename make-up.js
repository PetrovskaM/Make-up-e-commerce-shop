const urlproducts = 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=revlon'

// Get Request for featured products
fetch(urlproducts)
    .then((resp) => resp.json())
    .then((data) => {
        fetchHelpProducts(data);

    })

    .catch((error) => {
        console.log(error);
    });

fetchHelpProducts = (data) => {
    data.forEach((element, index) => {
        if (index <= 5) {
            const card = document.querySelector(`.card-${index}`);
            card.innerHTML = `<img src="${element.image_link}"> <div class="card-body-${index} m-3"> <a href="#" class="text-decoration-none"> <h5 id="${element.id}" class="card-title title-height">${element.name} </h5> </a> <p class="fw-bolder"> $${element.price} </p> <p class="card-text description">${element.description}</p> </div> <div class="card-footer text-end"> <a href="${element.product_link}" class="btn btn-outline-success">Buy</a> </div>`;
            eventListenerTitle(element.id);
        }
    });
}

// title Eventlistener
let eventListenerTitle = (data) => {
    let title = document.querySelector(`[id='${data}']`);
    title.addEventListener('click', (event) => {
        localStorage.setItem('id', JSON.parse(event.target.id));
        title.setAttribute('href', 'product-details.html')
        window.open("product-details.html");
    })
}

// leftSide-Categories EventListener
const listCategory = document.querySelectorAll('.category');
listCategory.forEach(element => {
    element.addEventListener('click', () => {
        localStorage.setItem('value', element.innerHTML);
        window.open("category-page.html");
    })
})

// footer date now
const d = new Date()
const year = d.getFullYear();
document.getElementById("year").innerHTML = year;