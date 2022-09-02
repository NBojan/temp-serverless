const result = document.querySelector(".result")

const fetching = async () => {
    result.innerHTML = `<h2>Loading...</h2>`
    const queryString = window.location.search;
    const response = await axios.get(`/api/3-z-complete${queryString}`)
    .catch(err => {
        result.innerHTML = `<h4>${err.response.data}</h4>`
    })
    
    if(response){
        const {name, desc, price, image} = response.data.fields;
        result.innerHTML = `
            <h1 class="title">${name}</h1>
            <article class="product">
            <img class="product-img"
            src="${image[0].url}"
            alt="${name}"
            />
            <div class="product-info">
                <h5 class="title">${name}</h5>
                <h5 class="price">${price}</h5>
                <p class="desc">${desc}</p>
            </div>
            </article>
        `;
    }
    
}

fetching();

// const urlParams = new URLSearchParams(queryString);
// const id = urlParams.get("id")
// the serverless function takes the query and finds each argument by itself