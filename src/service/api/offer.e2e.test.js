'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {
  HttpCode
} = require(`../../constants`);

const offer = require(`./offer`);
const OfferService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);

const mockData = [{
  "id": `tsBQ_M`,
  "title": `Отдам в хорошие руки подшивку «Мурзилка»`,
  "picture": `item09.jpg`,
  "description": ``,
  "type": `SALE`,
  "sum": 6747,
  "category": [`Разное`],
  "comments": [{
    "id": `VyVSp4`,
    "text": `Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле.`
  }]
}, {
  "id": `OOZAvN`,
  "title": `Дам велосипед покататься`,
  "picture": `item09.jpg`,
  "description": `Это настоящая находка для коллекционера! Кому нужен этот новый телефон, если тут такое...`,
  "type": `SALE`,
  "sum": 96999,
  "category": [`Журналы`],
  "comments": [{
    "id": `shVWge`,
    "text": `А где блок питания?`
  }, {
    "id": `sQhdH9`,
    "text": `А сколько игр в комплекте? Вы что?! В магазине дешевле. Неплохо, но дорого.`
  }]
}, {
  "id": `7CJynS`,
  "title": `Куплю породистого кота`,
  "picture": `item03.jpg`,
  "description": `Надевала один раз. Честно.`,
  "type": `SALE`,
  "sum": 11949,
  "category": [`Музыкальные инструменты`],
  "comments": [{
    "id": `-OM5n0`,
    "text": `С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту?`
  }, {
    "id": `xgk6AK`,
    "text": `Почему в таком ужасном состоянии? А сколько игр в комплекте?`
  }, {
    "id": `_6TPUE`,
    "text": `Вы что?! В магазине дешевле. Оплата наличными или перевод на карту? Почему в таком ужасном состоянии?`
  }, {
    "id": `bjhI2F`,
    "text": `Совсем немного... А сколько игр в комплекте?`
  }]
}, {
  "id": `cmcGyF`,
  "title": `Преподаю сольфеджио`,
  "picture": `item09.jpg`,
  "description": `Если найдёте дешевле — сброшу цену. Не пытайтесь торговаться. Цену вещам я знаю. Если товар не понравится — верну всё до последней копейки. Таких предложений больше нет! Кому нужен этот новый телефон, если тут такое...`,
  "type": `OFFER`,
  "sum": 73790,
  "category": [`Игры`],
  "comments": [{
    "id": `vKOO2B`,
    "text": `С чем связана продажа? Почему так дешёво?`
  }, {
    "id": `-u-X36`,
    "text": `Оплата наличными или перевод на карту? Неплохо, но дорого.`
  }]
}, {
  "id": `50SYw0`,
  "title": `Преподаю сольфеджио`,
  "picture": `item10.jpg`,
  "description": `Надевала один раз. Честно. Кажется, что это хрупкая вещь.`,
  "type": `SALE`,
  "sum": 3652,
  "category": [`Животные`],
  "comments": [{
    "id": `a5KoTr`,
    "text": `Почему в таком ужасном состоянии?`
  }, {
    "id": `m9Jo9I`,
    "text": `С чем связана продажа? Почему так дешёво?`
  }, {
    "id": `H3vDue`,
    "text": `А где блок питания?`
  }, {
    "id": `SNSlp0`,
    "text": `Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии? С чем связана продажа? Почему так дешёво?`
  }]
}];

const newOffer = {
  category: `Котики`,
  title: `Дам погладить котика`,
  description: `Дам погладить котика. Дорого. Не гербалайф`,
  picture: `cat.jpg`,
  type: `OFFER`,
  sum: 100500
};

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  offer(app, new OfferService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all offers`, () => {
  let response;

  beforeAll(async () => {
    const app = createAPI();
    response = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns a list of 5 offers`, () => expect(response.body.length).toBe(5));
  test(`First offer's id equals "tsBQ_M"`, () => expect(response.body[0].id).toBe(`tsBQ_M`));
});

describe(`API returns an offer with given id`, () => {
  let response;

  beforeAll(async () => {
    const app = createAPI();
    response = await request(app)
      .get(`/offers/OOZAvN`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Offer's title equals "Дам велосипед покататься"`, () =>
    expect(response.body.title).toBe(`Дам велосипед покататься`));
});

describe(`API creates an offer if data is valid`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = createAPI();
    response = await request(app)
      .post(`/offers`)
      .send(newOffer);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));
  test(`Offers count is changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(6))
  );
});

describe(`API refuses to create an offer if data is invalid`, () => {
  let app;

  beforeAll(async () => {
    app = createAPI();
  });

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {
        ...newOffer
      };
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
  test(`Offer count is 5`, () => request(app)
    .get(`/offers`)
    .expect((res) => {
      expect(res.body.length).toBe(5);
    })
  );
});

describe(`API changes existent offer`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = createAPI();
    response = await request(app)
      .put(`/offers/tsBQ_M`)
      .send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns changed offer`, () =>
    expect(response.body).toEqual(expect.objectContaining(newOffer)));
  test(`Offer is really changed`, async () => request(app)
    .get(`/offers/tsBQ_M`)
    .expect((res) => expect(res.body).toEqual(expect.objectContaining(newOffer))));
});

test(`API returns status code 404 when trying to change non-existent offer`, () => {
  const app = createAPI();

  const validOffer = {
    category: `Это`,
    title: `валидный`,
    description: `объект`,
    picture: `объявления`,
    type: `однако`,
    sum: 404
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, () => {
  const app = createAPI();

  const invalidOffer = {
    category: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = createAPI();
    response = await request(app)
      .delete(`/offers/50SYw0`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`50SYw0`));
  test(`Offer count is 4 now`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

test(`API refuses to delete non-existent offer`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/offers/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of all comments by offerId = 7CJynS`, () => {
  let response;

  beforeAll(async () => {
    const app = createAPI();
    response = await request(app)
      .get(`/offers/7CJynS/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns a list of 4 comments`, () => expect(response.body.length).toBe(4));
  test(`First comments's id equals "-OM5n0"`, () => expect(response.body[0].id).toBe(`-OM5n0`));
});

describe(`API creates a comment if data is valid`, () => {
  let app;
  let response;

  const newComment = {
    text: `Очень хороший товар`
  };

  beforeAll(async () => {
    app = createAPI();
    response = await request(app)
      .post(`/offers/7CJynS/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));
  test(`Offers count is changed`, () => request(app)
    .get(`/offers/7CJynS/comments`)
    .expect((res) => expect(res.body.length).toBe(5))
  );
});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, () => {
  const app = createAPI();

  return request(app)
    .post(`/offers/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);
});

describe(`API correctly deletes a comment`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = createAPI();
    response = await request(app)
      .delete(`/offers/7CJynS/comments/bjhI2F`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted comment`, () => expect(response.body.id).toBe(`bjhI2F`));
  test(`Comment count is 3 now`, () => request(app)
    .get(`/offers/7CJynS/comments`)
    .expect((res) => expect(res.body.length).toBe(3))
  );
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/offers/7CJynS/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});
