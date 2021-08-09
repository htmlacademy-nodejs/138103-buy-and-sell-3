'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {
  HttpCode
} = require(`../../constants`);

const search = require(`./search`);
const SearchService = require(`../data-service/search`);

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

const app = express();
app.use(express.json());
search(app, new SearchService(mockData));

describe(`API returns offer based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Преподаю сольфеджио`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`2 offer found`, () => expect(response.body.length).toBe(2));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`cmcGyF`));
});

test(`API returns code 404 if nothing is found`, () => request(app)
  .get(`/search`)
  .query({
    query: `Уроки лепки из творога`
  })
  .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`, () => request(app)
  .get(`/search`)
  .expect(HttpCode.BAD_REQUEST)
);
