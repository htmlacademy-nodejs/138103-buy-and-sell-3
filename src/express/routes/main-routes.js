'use strict';

const {
  Router
} = require(`express`);
const api = require(`../api`).getAPI();

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  const pugOffers = await api.getOffers();
  res.render(`main/main`, {
    pugOffers
  });
}); // главная страница
mainRouter.get(`/register`, (req, res) => res.render(`main/sign-up`)); // регистрация
mainRouter.get(`/login`, (req, res) => res.render(`main/login`)); // вход
mainRouter.get(`/search`, async (req, res) => {
  try {
    const {
      search
    } = req.query;
    const results = await api.search(search);
    res.render(`main/search-result`, {
      results
    });
  } catch (error) {
    res.render(`main/search-result`, {
      results: []
    });
  }

}); // страница с результатами поиска

module.exports = mainRouter;
