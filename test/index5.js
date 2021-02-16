function tst(param) {
    const { limit, symbol } = param;


    const tst = {
        limit, symbol
    }

    console.log(tst)
    console.log(limit)
    console.log(symbol)
}

tst({
    limit:1
})

