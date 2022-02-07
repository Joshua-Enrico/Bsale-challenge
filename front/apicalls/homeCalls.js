const data = [
    {
        "id": 5,
        "name": "ENERGETICA MR BIG",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
        "price": 1490,
        "discount": 20,
        "category": 1
    },
    {
        "id": 6,
        "name": "ENERGETICA RED BULL",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
        "price": 1490,
        "discount": 0,
        "category": 1
    },
    {
        "id": 7,
        "name": "ENERGETICA SCORE",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/logo7698.png",
        "price": 1290,
        "discount": 0,
        "category": 1
    },
    {
        "id": 8,
        "name": "PISCO ALTO DEL CARMEN 35º",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto8532.jpg",
        "price": 7990,
        "discount": 10,
        "category": 2
    },
    {
        "id": 9,
        "name": "PISCO ALTO DEL CARMEN 40º ",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto408581.jpg",
        "price": 5990,
        "discount": 0,
        "category": 2
    },
    {
        "id": 10,
        "name": "PISCO ARTESANOS 35º ",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/artesanos8818.jpg",
        "price": 3990,
        "discount": 0,
        "category": 2
    },
    {
        "id": 11,
        "name": "PISCO BAUZA 40º ",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/bauza408831.jpg",
        "price": 4990,
        "discount": 0,
        "category": 2
    },
    {
        "id": 12,
        "name": "PISCO CAMPANARIO 35º",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/campanario8845.jpg",
        "price": 2990,
        "discount": 20,
        "category": 2
    }
]
    const url = `http://127.0.0.1:5500/front/pages/sproduct.html?id=`;
    const getProducts = () => {
        axios.get('http://localhost:3000/api/products/qty/8')
            .then(response => {
                const products = response.data;
                products.map(({id, name, url_image, price, discount, category}) => {
                    $('#product-container').append(`
                    <div class="pro">
                        <img src="${url_image}" alt="">
                        <div class="des">
                            ${
                                discount ? `<span class="price">${discount}% de descuento</span>` : ""
                            }
                            <h5>${name}</h5>
                            <h4>$${price}</h4>
                        </div>
                        <a href="${url + id}"><i class="fas fa-shopping-cart cart"></i></a>
                    </div>
                    `)
                })
            }).catch(err => {
                console.log(err);
                data.map(({id, name, url_image, price, discount, category}) => {
                    $('#product-container').append(`
                    <div class="pro">
                        <img src="${url_image}" alt="">
                        <div class="des">
                            ${
                                discount ? `<span class="price">${discount}% de descuento</span>` : ""
                            }
                            <h5>${name}</h5>
                            <h4>$${price}</h4>
                        </div>
                        <a href="${url + id}"><i class="fas fa-shopping-cart cart"></i></a>
                    </div>
                    `)
                })
            })
    }

getProducts();



