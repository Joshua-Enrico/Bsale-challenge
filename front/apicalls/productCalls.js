function getParams(key = null){
    let currentUrl = window.location.search;
    let url = new URLSearchParams(currentUrl);
    if(key){
        return url.get(key);
    }

}

const getProductByid = () => {
    const id = getParams('id')
    if (id) {
        axios.get("http://localhost:3000/api/products/" + id)
        .then(response => {
            const product = response.data;
            const {id, name, url_image, price, discount, category} = product;
            $('#prodetails').append(`
                <div class="single-pro-image">
                        <img src="${url_image}" width="100%" id="MainImg" alt=""> 
                    </div>
                    <div class="single-pro-details">
                        <h6>${category}</h6>
                        <h4>${name}</h4>
                        <h2>$${price}</h2>
                    <select>
                        <option value="">Cantidad</option>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                    </select>
                    <input type="number" value="1">
                    <button class="normal">Agregar Al Carrito</button>
                </div>
            `)
        })
    }
}

getProductByid();
