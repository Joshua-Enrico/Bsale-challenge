const url = `http://127.0.0.1:5500/front/pages/sproduct.html?id=`;


function getParams(key = null) {
    let currentUrl = window.location.search;
    let url = new URLSearchParams(currentUrl);
    if (key) {
        return url.get(key);
    }

}


const getProductByid = (selectArg) => {
    let arg = getParams('arg')

    if (selectArg){
        arg = selectArg
    }

    let content = '';
    let pages = '';

    if (arg) {
        axios.get('http://localhost:3000/api/products/search/' + arg)
            .then(response => {
                const element = document.getElementById('product-container');
                const products = response.data.rows;
                pages = Math.ceil(response.data.count / 8);
                Pagination(pages, arg);
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
getProductByid();


// funcion para llamar productos por paginacion
const getProductsByPage = ( page, size, arg) => {

    axios.get(`http://localhost:3000/api/products/search/paginate/${arg}?page=${page}&size=${size}`)
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



$("#select").change(function () {
    
    const arg = $(this).val()
    getProductByid(arg);
  });