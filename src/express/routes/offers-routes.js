'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/category/:id`, (req, res) => res.send(`/offers/category/:id`)); // объявления определённой категории
offersRouter.get(`/add`, (req, res) => res.send(`/offers/add`)); // страница создания нового объявления
offersRouter.get(`/edit/:id`, (req, res) => res.send(`/offers/edit/:id`)); // редактирование объявления
offersRouter.get(`/:id`, (req, res) => res.send(`/offers/:id`)); // страница объявления

module.exports = offersRouter;
