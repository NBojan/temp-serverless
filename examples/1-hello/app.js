const result = document.querySelector(".result");

const fetchData = async () => {
    const response = await axios.get("/api/1-hello")
    .catch(err => result.textContent = err.response.data);

    if(response) result.textContent = response.data;
}

fetchData();