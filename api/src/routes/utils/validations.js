/*Modulo para funciones de validacion */

/* Esta funcion valida que los parametros enviados sean numeros no negativos 
   y no falte algun argumento */
function VldParams(intSize, intPage) {
    if (intSize === "" || intPage === "") {
        return { isValid: false, message: "Pagina y tamaño son requeridos" };

    } else if (intSize === NaN || intSize < 1 || intSize > 10) {
        return { isValid: false, message: "El tamaño debe ser un numero mayor a 0 y menor a 10" };

    } else if (intPage === NaN || intPage < 0) {
        return { isValid: false, message: "La pagina debe ser un numero valido" };

    }
    return { isValid: true };

}

module.exports = { VldParams }