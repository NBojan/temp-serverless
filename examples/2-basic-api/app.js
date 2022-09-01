const result = document.querySelector('.result')

const fetching = async () => {
    const response = await axios.get("/api/2-basic-api")
    .catch(err => result.innerHTML = "There was an error");

    if(response.data){
        const products = response.data.map(product => {
            const {image: {url}, name, price} = product;
            return `<article class="product">
                <img src="${url}" alt="${name}" />
                <div>
                    <h5>${name}</h5>
                    <h5 class="price">${price}</h5>
                </div>
            </article>`
        }).join("");
        result.innerHTML = products;
    }
}

fetching();