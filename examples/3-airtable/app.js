const result = document.querySelector('.result')

const fetching = async () => {
    const response = await axios.get("/api/3-z-complete")
    .catch(err => result.innerHTML = "There was an error");

    if(response){
        const products = response.data.map(product => {
            const {id,url,name,price} = product;
            return `<a href="product.html?id=${id}" class="product">
                <img src="${url}" alt="${name}" />
                <div class="info">
                    <h5>${name}</h5>
                    <h5 class="price">${price}</h5>
                </div>
            </a>`
        }).join("");
        result.innerHTML = products;
    }
}

fetching();