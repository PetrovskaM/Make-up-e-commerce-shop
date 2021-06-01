const value = localStorage.getItem('value');
const main = document.querySelector('#main');

// header
header = () => {
    const title = document.querySelector('.title');
    if (value == 'Blush' || value == 'Nail polish') {
        title.innerHTML=  `Listing ${value}es` ;
    } else {
        title.innerHTML = `Listing ${value}s`;
    }
}
const productType = document.querySelector('.product-type');
productType.innerHTML = `Product type : ${value}`;
header ();

// All products  in the selected category
const urlCategory = `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${value}`;
fetch(urlCategory)
    .then((resp) => resp.json())
    .then((data) => {
        data.forEach((element, index) => {
            category(element, index);
        });
        eventListenerCard();
    })
    .catch((error) => {
        console.log(error);
    });

category = (data, index) => {
    const row = document.querySelector('.row');
    const div = document.createElement('div');
    div.classList.add('card', 'border-0', 'col-md-3', 'd-inline-block', 'pt-3');
    div.setAttribute('id', data.id);
    div.innerHTML = `<img src="${data.image_link}" class="card-img-top""> <div class="card-body"> <p class="text-capitalize m-0 pb-2"> ${data.brand}</p> <p class="m-0 pb-1">${data.name}</p> <p class="m-0 pb-2">Category ${data.category}</p> <p class="m-0"> $ ${data.price}</p> <div class="product-color" data-key="${index}">  </div> </div>`;
    row.appendChild(div);
    productColors(data.product_colors, index);
}

productColors = (dataProductColor, index) => {
    const diivColor = document.querySelector(`[data-key='${index}']`);
    if (dataProductColor.length) {
        dataProductColor.forEach(element => {
            const divHex = document.createElement('div');
            divHex.classList.add('color', 'd-inline-block', 'me-1');
            divHex.style.backgroundColor = `${element.hex_value}`;
            diivColor.appendChild(divHex);
        })
    }
}

// Search By Name
const searchByName = document.querySelector('.search-name');
searchByName.addEventListener('click', function () {
    const searchBarName = document.querySelector('.searchBar-name').value;
    const urlByName = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${searchBarName}&product_type=${value}`
    categoryByNameVSPrice(urlByName);
});

// Search By Price
const select = document.querySelector('.select-price');
select.addEventListener('change', function () {
    const fisrtValue = select.value.substring(0, 2);
    const secondValue = select.value.substring(3, 5);
    const urlPrice = `http://makeup-api.herokuapp.com/api/v1/products.json?price_greater_than=${fisrtValue}&price_less_than=${secondValue}&product_type=${value}`
    categoryByNameVSPrice(urlPrice);
});

// Fetch by name & by price
categoryByNameVSPrice = (url) => {
    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            main.innerHTML = '';
            data.forEach(element => {
                category(element);
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

// Event Listener Card -navigated to product details
eventListenerCard = () => {
    const card = document.querySelectorAll('.card');
    card.forEach(element => {
        element.addEventListener('click', () => {
            localStorage.setItem('id', element.id);
            window.open("product-details.html");
        })
    })
}