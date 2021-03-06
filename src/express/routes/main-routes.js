'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.render(`main`)); // главная страница
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`)); // регистрация
mainRouter.get(`/login`, (req, res) => res.render(`login`)); // вход
mainRouter.get(`/search`, (req, res) => res.render(`search-result`)); // страница с результатами поиска

module.exports = mainRouter;
