const express = require('express')
const router = express.Router()
const {Book} = require('../book')
const fileMulter = require('../middleware/file')
const paths = require('path')


const library = {
    books: [],
}

router.get('/', (req, res) => {
    const {books} = library
    res.json(books)
})



router.get('/:id', (req, res) => {
    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if(idx !== -1){
        res.json(books[idx])
    }else{
        res.status(404)
    }
})

router.get('/:id/download', (req, res) => {
    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if(idx !== -1){
        const {fileBook} = books[idx]
        res.sendFile(paths.resolve(__dirname + '/../') + '/' +fileBook)
    }else{
        res.status(404)
    }
})

router.post('/', 
    fileMulter.single('cover-img'),
    (req, res) => {
        let myPath
        if(req.file){
            const {path} = req.file
            myPath = path
            myName =  paths.basename(myPath)
        }else{
            myPath = ''
            myName = ''
        }
        const {books} = library
        const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
        const newBook = new Book(title, description, authors, favorite, fileCover, fileName, myName, myPath)
        books.push(newBook)

        res.status(201)
        res.json(newBook)
})


router.put('/:id', (req, res) => {
    const {books} = library  
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if(idx !== -1){
        books[idx] = {
            ...books[idx],
            title, 
            description, 
            authors, 
            favorite, 
            fileCover, 
            fileName,
            fileBook,
        }
        res.json(books[idx])
    }else{
        res.status(404)
    }
})

router.delete('/:id', (req, res) => {
    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if(idx !== -1){
        books.splice(idx, 1)
        res.json('ok')
    }else{
        res.status(404)
    }
})

module.exports = router