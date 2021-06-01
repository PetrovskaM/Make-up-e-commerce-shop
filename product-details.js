const id = localStorage.getItem('id');
const urlDetails = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;

fetch(urlDetails)
    .then((resp) => resp.json())
    .then((data) => {
        productDetails(data);
    })

    .catch((error) => {
        console.log(error);
    });

productDetails = (data) => {
    const title = document.querySelector('.title');
    const main = document.querySelector('#main');
    title.innerHTML = `${data.name}`;
    main.innerHTML = `<img src="${data.image_link}" class="img border border-1 mb-3"> <p class="text-capitalize m-0"> Brand: ${data.brand}</p> <p class="m-0 pb-1">Price: $${data.price}</p> <p class="m-0 pb-3">Star rating: ${data.rating}</p> <a class="btn bg-purple text-white rounded-0"> Buy Now </a>  <hr> <div class="product-color"> </div> <hr> <p> <strong>Description:</strong> ${data.description}</p> <div class="tag-list">Tags: </div><hr>`;
    productColors(data.product_colors);
    tagList(data.tag_list);

}

productColors = (dataProductColor) => {
    let divColors = document.querySelector('.product-color');
    if (dataProductColor.length) {
        dataProductColor.forEach(element => {
            const divHex = document.createElement('div');
            const span = document.createElement('span');
            divHex.classList.add('color');
            divHex.classList.add('d-inline-block', 'me-2', 'border-');
            divHex.style.backgroundColor = `${element.hex_value}`;
            span.innerHTML = `${element.colour_name}`;
            span.classList.add('d-inline', 'me-4');
            divColors.appendChild(divHex);
            divColors.appendChild(span);
        })
    } else {
        const divNoColor = document.createElement('div');
        divNoColor.innerHTML = `<p> >No color< </p>`;
        divColors.appendChild(divNoColor);

    }
}

tagList = (dataTagList) => {
    const tags = document.querySelector('.tag-list');
    const ul = document.createElement('ul');
    if (dataTagList.length) {
        dataTagList.forEach(element => {
            const li = document.createElement('li');
            li.innerHTML = `${element}`;
            ul.appendChild(li);
        })
        tags.appendChild(ul);
    }
}

