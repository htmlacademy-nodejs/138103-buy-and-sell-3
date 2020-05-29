'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.send(`/`)); // главная страница
mainRouter.get(`/register`, (req, res) => res.send(`/register`)); // регистрация
mainRouter.get(`/login`, (req, res) => res.send(`/login`)); // вход
mainRouter.get(`/search`, (req, res) => res.send(`/search`)); // страница с результатами поиска

module.exports = mainRouter;
