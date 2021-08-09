'use strict';

const {
  nanoid
} = require(`nanoid`);
const {
  MAX_ID_LENGTH
} = require(`../../constants`);

class OfferService {
  constructor(offers) {
    this._offers = offers;
  }

  create(offer) {
    const newOffer = {
      ...offer,
      id: nanoid(MAX_ID_LENGTH),
      comments: []
    };
    this._offers.push(newOffer);

    return newOffer;
  }

  drop(id) {
    const offer = this._offers.find((item) => item.id === id);

    if (!offer) {
      return null;
    }

    this._offers = this._offers.filter((item) => item.id !== id);
    return offer;
  }

  findAll() {
    return this._offers;
  }

  findOne(id) {
    return this._offers.find((item) => item.id === id);
  }

  update(id, offer) {
    const oldOfferIndex = this._offers.findIndex((item) => item.id === id);
    const newOffer = {
      ...this._offers[oldOfferIndex],
      ...offer
    };
    this._offers[oldOfferIndex] = newOffer;
    return newOffer;
  }
}

module.exports = OfferService;
