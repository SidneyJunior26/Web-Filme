const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const axios = require('axios')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(session({
    secret: 'apifilme',
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})


app.get('/', (req, res) => {
    res.render('index.handlebars')
})

app.get('/search/:title', (req, res) => {
    axios.get('http://localhost:3000/api/movies/' + req.params.title).then(function(resposta){

    req.flash('success_msg', JSON.stringify(resposta.data))
    res.redirect('/')
    
    }).catch((err) => {
        console.log(err)
    })
})

app.get('/all', (req, res) => {
    axios.get('http://localhost:3000/api/movies').then(function(resposta){

    req.flash('success_msg', JSON.stringify(resposta.data))
    res.redirect('/')
    
    }).catch((err) => {
        console.log(err)
    })
})

app.listen(8080, (req, res) => {
    console.log('Servidor rodando na porta 8080.')
})