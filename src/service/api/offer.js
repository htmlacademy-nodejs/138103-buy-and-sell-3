'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const offerValidator = require(`../middlewares/offer-validator`);
const offerExist = require(`../middlewares/offer-exist`);
const commentValidator = require(`../middlewares/comment-validator`);

const route = new Router();

module.exports = (app, offerService, commentService) => {
  app.use(`/offers`, route);

  route.get(`/`, async (req, res) => {
    const offers = offerService.findAll();
    return res.status(HttpCode.OK).json(offers);
  });

  route.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  });

  route.put(`/:offerId`, [offerValidator, offerExist(offerService)], (req, res) => {
    const {offer} = res.locals;
    const updatedOffer = offerService.update(offer.id, req.body);

    return res.status(HttpCode.OK)
      .json(updatedOffer);
  });

  route.delete(`/:offerId`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;
    const deletedOffer = offerService.drop(offer.id);

    return res.status(HttpCode.OK)
      .json(deletedOffer);
  });

  route.get(`/:offerId/comments`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);

    return res.status(HttpCode.OK)
      .json(comments);
  });

  route.post(`/:offerId/comments`, [offerExist(offerService), commentValidator], (req, res) => {
    const {offer} = res.locals;
    const comment = commentService.create(offer, req.body);

    return res.status(HttpCode.CREATED)
      .json(comment);
  });

  route.delete(`/:offerId/comments/:commentId`, offerExist(offerService), (req, res) => {
    const {commentId} = req.params;
    const {offer} = res.locals;
    const deletedComment = commentService.drop(offer, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${commentId}`);
    }

    return res.status(HttpCode.OK)
      .json(deletedComment);
  });
};
