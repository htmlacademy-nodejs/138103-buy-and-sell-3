'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.render(`my-tickets`)); // мои объявления
myRouter.get(`/comments`, (req, res) => res.render(`comments`)); // комментарии к публикациям

module.exports = myRouter;
