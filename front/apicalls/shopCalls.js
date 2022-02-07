
    const getProducts = (req, res) => {
        axios.get('http://localhost:3000/api/products/qty/8')
            .then(response => {
                const products = response.data;
                products.map(({id, name, url_image, price, discount, category}) => {
                    $('#product-container').append(`
                    <div class="pro">
                        <img src="${url_image}" alt="">
                        <div class="des">
                            ${
                                discount ? `<span class="price">$${price} de descuento</span>` : ""
                            }
                            <h5>${name}}</h5>
                            <h4>$${price}}</h4>
                        </div>
                        <a href="#"><i class="fas fa-shopping-cart cart"></i></a>
                    </div>
                    `)
                })
            }).catch(err => {
                console.log(err);
            })
    }

getProducts();