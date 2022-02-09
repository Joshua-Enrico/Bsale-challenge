/* Este modulo contiene las llamadas para homepage */

const url = `http://127.0.0.1:5500/front/pages/sproduct.html?id=`;// url para redireccionar a producto

/*  Funcion para solicitud get y obtener productos definios,
    Una vez obtenido los productos, lo renderizamos en la pagina  */
const getProducts = () => {
    axios.get('http://localhost:3000/api/products/qty/8')
        .then(response => {
            const products = response.data;
            products.map(({ id, name, url_image, price, discount, category }) => {
                $('#product-container').append(`
                    <div class="pro">
                        <img src="${url_image}" alt="">
                        <div class="des">
                            ${discount ? `<span class="price">${discount}% de descuento</span>` : ""
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
        })
}

getProducts();



