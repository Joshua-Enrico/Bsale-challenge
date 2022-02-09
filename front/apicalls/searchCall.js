let argument = "";

const searchCall = (argument) => {
    window.location.href='http://127.0.0.1:5500/front/pages/shop.html?arg=' + argument;
}

const input = document.getElementById("inputsearch");
input.addEventListener('change', runCall);

function runCall(e) {
    argument = e.target.value;
    if(argument !== ""){
        searchCall(argument);
    }
  }
