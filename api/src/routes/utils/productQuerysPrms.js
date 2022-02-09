/*  Esta Genera un query conditional dependiendo
    de los parametros envidados desde el cliente*/
function QueryParamsPg(orderP, search, intPage, intSize, id, Op) {
    if (orderP === "ASC" || orderP === "DESC") {
        return ({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { category: id }
                ]
            },
            limit: intSize,// limite de productos por pagina
            offset: intPage * intSize, // numero de pagina
            order: [
                ["price", `${orderP}`]
            ]

        })
    } else {
        return ({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { category: id }
                ]
            },
            limit: intSize,// limite de productos por pagina
            offset: intPage * intSize, // numero de pagina
        })
    }

}


/*  Esta Genera un query conditional dependiendo
    de los parametros envidados desde el cliente*/
function QueryParams2(orderP, search, id, Op) {
     if (orderP === "ASC" || orderP === "DESC") {
        
        return ({
            where: {
                [Op.or]: [
                    { name: { [Op.substring]: `%${search}%` } },
                    { category: id }
                ]
            },
            limit: 8, // el numero de productos por pagina sera de 8 por defecto
            order: [
                ["price", `${orderP}`]
            ]
        })
    } else {
        return ({
            where: {
                [Op.or]: [
                    { name: { [Op.substring]: `%${search}%` } },
                    { category: id }
                ]
            },
            limit: 8, // el numero de productos por pagina sera de 8 por defecto
        })
    }

}


/*  Esta Genera un query conditional dependiendo
    de los parametros envidados desde el cliente*/
function QueryAll(orderP) {
    if (orderP && orderP === "ASC" || orderP === "DESC") {
        return ({
            limit: 8,
            order: [
                ["price", `${orderP}`]
            ]
        })
    } else {
        return ({
            limit: 8,
        })
    }
}


/*  Esta Genera un query conditional dependiendo
    de los parametros envidados desde el cliente*/
function QueryAllPaginate(orderP, intSize, intPage) {
    console.log(orderP);
    if (orderP && orderP === "ASC" || orderP === "DESC") {
        return ({
            limit: intSize,
            offset: intPage * intSize,
            order: [
                ["price", `${orderP}`]
            ]
        })
    } else {
        return ({
            limit: intSize,
            offset: intPage * intSize,
        })
    }
}

module.exports = { QueryParamsPg, QueryParams2, QueryAll, QueryAllPaginate };