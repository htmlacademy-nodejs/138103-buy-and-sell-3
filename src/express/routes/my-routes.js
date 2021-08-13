'use strict';

const {
  Router
} = require(`express`);
const api = require(`../api`).getAPI();

const myRouter = new Router();

// мои объявления
myRouter.get(`/`, async (req, res) => {
  const pugOffers = await api.getOffers();
  res.render(`my/my-tickets`, {
    pugOffers
  });
});

// комментарии к публикациям
myRouter.get(`/comments`, async (req, res) => {
  const pugOffers = await api.getOffers();
  res.render(`my/comments`, {
    pugOffers: pugOffers.slice(0, 3)
  });
});

module.exports = myRouter;
