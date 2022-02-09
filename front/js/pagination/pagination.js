
const element = document.querySelector(".pagination ul");
let totalPages = '';
let page = 1;


function Pagination(pages, arg) {
  // selecting required element
  totalPages = pages;

  //calling function with passing parameters and adding inside element which is ul tag
  element.innerHTML = createPagination(totalPages, page, arg);

}

// Esta funcion crea la paginacion manera dinamica cada vez que se hace una busqueda
function createPagination(totalPages, page, arg) {
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (page > 1) { //show the next button if the page value is greater than 1
    liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${page - 1}, '${arg}'); getProductsByPage(${(page - 1) - 1}, ${8}, '${arg}')"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }

  if (page > 5) { //if page value is less than 2 then add 1 after the previous button
    liTag += `<li class="first numb" onclick="createPagination(totalPages, 1, '${arg}');  getProductsByPage(0, ${8}, '${arg}')"><span>1</span></li>`;
    if (page > 3) { //if page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // how many pages or li show before the current li
  if (page == totalPages && totalPages > 5) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1 && totalPages > 5) {
    beforePage = beforePage - 1;
  }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) { //if plength is greater than totalPage length then continue
      continue;
    }
    if (plength == 0) { //if plength is 0 than add +1 in plength value
      plength = plength + 1;
    }
    if (page == plength) { //if page is equal to plength than assign active string in the active variable
      active = "active";
    } else { //else leave empty to the active variable
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength}, '${arg}'); getProductsByPage(${plength - 1}, ${8}, '${arg}')"><span>${plength}</span></li>`;
  }

  if (totalPages > 5 && page < totalPages - 1) { //if page value is less than totalPage value by -1 then show the last li or page
    if (page < totalPages - 2) { //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(totalPages, ${ totalPages }, '${arg}'); getProductsByPage(${totalPages - 1}, ${8}, '${arg}')"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) { //show the next button if the page value is less than totalPage(20)
    liTag += `<li class="btn next" onclick="createPagination(totalPages, ${page + 1}, '${arg}'); getProductsByPage(${(page - 1) + 1}, ${8}, '${arg}')"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }
  element.innerHTML = liTag; //add li tag inside ul tag
  return liTag; //reurn the li tag
}
