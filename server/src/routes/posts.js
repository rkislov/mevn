const express = require('express')
const router = express.Router()
const Post = require('../models/post-model')
const passport = require('passport')
require('../config/passport')(passport)

router.post('/posts', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers)
    if(token) {
        const post = new Post ({
            title: req.body.title,
            description: req.body.description
        })
        post.save((err,data) =>{
            if(err) {
                console.log(err)
            } else {
                res.send({
                    success: true,
                    message: `Публикация с _id: ${data._id} сохранена`
                })
            }
        })
    } else {
        return res.status(403).send({success: false, message: 'Не авторизован'})
    }


})

router.get('/posts', passport.authenticate('jwt', {session: false}), (req, res) =>{
    const token = getToken(req.headers)
    if(token) {
        Post.find({}, 'title description', (err, posts) => {
            if (err) {
                res.sendStatus(500)
            } else {
                res.send({posts: posts})
            }
        }).sort({_id: -1})
    } else {
        return res.status(403).send({success: false, message: 'Не авторизован'})
    }
})


router.get('/posts/:id',  passport.authenticate('jwt', {session: false}), (req, res) =>{
    const token = getToken(req.headers)
    if(token) {
        Post.findById(req.params.id, 'title description', (err, post) => {
            if (err) {
                res.status(500)
            } else {
                res.send(post)
            }
        })
    }  else {
        return res.status(403).send({success: false, message: 'Не авторизован'})
    }
})

router.put('/posts/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers)
    if(token) {
        Post.findById(req.params.id, 'title description', (err, post) => {
            if (err) {
                console.log(err)
            } else {
                if (req.body.title) {
                    post.title = req.body.title
                }
                if (req.body.description) {
                    post.description = req.body.description
                }

                post.save(err => {
                    if (err) {
                        res.sendStatus(500)
                    } else {
                        res.sendStatus(200)
                    }
                })
            }
        })
    } else {
        return res.status(403).send({success: false, message: 'Не авторизован'})
    }
})

router.delete('/posts/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = getToken(req.headers)
    if(token) {
        Post.remove({_id: req.params.id}, err => {
            if (err) {
                res.sendStatus(500)
            } else {
                res.sendStatus(200)
            }
        })
    } else {
        return res.status(403).send({success: false, message: 'Не авторизован'})
    }
})

getToken = (headers) => {
    if (headers && headers.authorization){
        const parted = headers.authorization.split(' ')
        if (parted.length === 2) {
            return parted[1]
        } else {
            return null
        }
    } else {
        return null
    }
}
module.exports = router