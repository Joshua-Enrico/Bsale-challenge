/*  En este modulo tenemos todas las funciones,
    para las llamadas de busqueda y paginacion */

const url = PageUrl + `/sproduct.html?id=`;// url de single product

/* En esta funcion obtenemos el argumento definido desde el path */
function getParams(key = null) {
    let currentUrl = window.location.search;
    let url = new URLSearchParams(currentUrl);
    if (key) {
        return url.get(key);
    }

}


/* funcion para obtener productos por busqueda, el resultado se renderiza */
const getProductsBySearch = (selectArg, order) => {
    let arg = getParams('arg');
    let orderP = ""

    if (selectArg){
        arg = selectArg
    }
    if (order){
        orderP = order
    }

    let content = '';
    let pages = '';

    if (arg) {
        axios.get(ApiUrl + '/api/products/search/' + arg + `?orderP=${orderP}`)
            .then(response => {
                const element = document.getElementById('product-container');
                const products = response.data.rows;
                pages = Math.ceil(response.data.count / 8);

                Pagination(pages, arg, orderP);// Esta funcion genera la paginacion(paginactio.js)

                products.map(({ id, name, url_image, price, discount, category }) => {

                    content +=`
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
                    `;
                });
                element.innerHTML = content;
                console.log(element)
            }).catch(err => {
                console.log(err);
            })
    }
}
getProductsBySearch();


// funcion para llamar productos por paginacion por orden definido
const getProductsByPage = ( page, size, arg, sort) => {

    axios.get(ApiUrl + `/api/products/search/paginate/${arg}?page=${page}&size=${size}&orderP=${sort}`)
        .then(response => {
            const element = document.getElementById('product-container');
            const products = response.data.rows;
            let content = '';
            products.map(({ id, name, url_image, price, discount, category }) => {

                content += `<div class="pro">
                <img src="${url_image}" alt="">
                <div class="des">
                    ${discount ? `<span class="price">${discount}% de descuento</span>` : ""
                    }
                    <h5>${name}</h5>
                    <h4>$${price}</h4>
                </div>
                <a href="${url + id}"><i class="fas fa-shopping-cart cart"></i></a>
            </div>`;
            })
            element.innerHTML = content;
            console.log(element)
        }).catch(err => {
            console.log(err);
        })
}


/* Hace una llamada cuando interactuamos con el filtro */
$("#selectbox").change(function () {
    const arg = $("#select").val();
    const order = $("#orderBy").val();
    getProductsBySearch(arg, order);
});
