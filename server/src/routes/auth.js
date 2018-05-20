const express = require('express')
const mongoose = require('mongoose')
const settings = require('../config/config')
const passport = require('passport')
require('../config/passport')(passport)
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')

router.post('/register', (req, res) => {
    if (!req.body.username || !req.boby.email || !req.body.password) {
        res.json({success: false, message: 'Заполниет все поля'})
    } else {
        var newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password

        })
        newUser.save((err)=> {
            if (err)
                return res.json({success: false, message: 'Рользователь с такими данными уже существует'})
        })
        res.json({success: true, message: 'Новый пользователь создан'})
    }
})

router.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, message: 'Авторизация не выполненна. Такого пользователя нет'})
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    const token = jwt.sign(user.toJSON(), settings.secret)
                    res.json({success: true, tokent: 'JWT '+ token})
                } else {
                    res.status(401).send({success: false, message: 'Авторизация не выполненна. Не верный пароль'})
                }
            })
        }
    })
})
module.exports = router

