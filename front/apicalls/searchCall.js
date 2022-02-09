let argument = "";

/* funcion para redireccionar a pargina de producto,
con su argumento */
const searchCall = (argument) => {
    window.location.href='http://127.0.0.1:5500/front/pages/shop.html?arg=' + argument;
}

/* obtenemos el elemento input para implementar funcionalidad */
const input = document.getElementById("inputsearch");
input.addEventListener('change', runCall);

/* ejecuta el redirecionamiento  */
function runCall(e) {
    argument = e.target.value;
    if(argument !== ""){
        searchCall(argument);
    }
  }
