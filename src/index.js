const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { application } = require('express');
const { urlencoded } = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3001, () => {
    console.log("Servidor funcionando...")
})

let products = [{
    code: 1,
    category: "Alimentação",
    name: "Coxinha",
    description: "Uma coxinha de frango catupiry empanada com farinha panko e frita em óleo",
    foto: "Foto de coxinha",
    price: "R$ 3,50",
    qtd: "10",
    available: "sim"
}];

app.route('/products').get((req, res) => res.json(products));

app.route('/add').post((req, res) => {
    const lastCode = products[products.length -1].code;

    products.push({
        code: lastCode + 1,
        category: req.body.category,
        name: req.body.name,
        description: req.body.description,
        foto: req.body.foto,
        price: req.body.price,
        qtd: req.body.qtd,
        available: req.body.available
    })
    return res.json(products)
});

app.route('/update/:code').put((req, res) => {
    const productCode = req.params.code;

    const product = products.find( product => Number(product.code) === Number(productCode));

    if(!product) {
        return res.json('Product not found!')
    }

    const updatedProduct = {
        ...product,
        category: req.body.category,
        name: req.body.name,
        description: req.body.description,
        foto: req.body.foto,
        price: req.body.price,
        qtd: req.body.qtd,
        available: req.body.available
    }

    products = products.map( product => {
        if(Number(product.code) === Number(productCode)){
            product = updatedProduct
        }
        return product
    })
    res.json("Produto atualizado!")
})

app.route('/del/:code').delete((req, res) => {
    const productCode = req.params.code

    products = products.filter( product => Number(product.code) !== Number(productCode))

    res.json(products)
})


