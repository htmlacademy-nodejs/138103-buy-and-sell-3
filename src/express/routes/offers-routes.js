'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/category/:id`, (req, res) => res.render(`category`)); // объявления определённой категории
offersRouter.get(`/add`, (req, res) => res.render(`new-ticket`)); // страница создания нового объявления
offersRouter.get(`/edit/:id`, (req, res) => res.render(`ticket-edit`)); // редактирование объявления
offersRouter.get(`/:id`, (req, res) => res.render(`ticket`)); // страница объявления

module.exports = offersRouter;
