const DEFAULT_COUNT = 1;
const DEFAULT_COMMAND = `--generate`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
    success: 0,
    error: 1
};
const FILE_NAME = `mocks.json`;
const MAX_PUBLICATIONS = 1000;

const TITLES = [
    `Продам книги Стивена Кинга`,
    `Продам новую приставку Sony Playstation 5`,
    `Продам отличную подборку фильмов на VHS`,
    `Куплю антиквариат`,
    `Куплю породистого кота`,
    `Продам коллекцию журналов «Огонёк»`,
    `Отдам в хорошие руки подшивку «Мурзилка»`,
    `Продам советскую посуду. Почти не разбита`,
    `Куплю детские санки`
];

const SENTENCES = [
    `Товар в отличном состоянии.`,
    `Пользовались бережно и только по большим праздникам.`,
    `Продаю с болью в сердце...`,
    `Бонусом отдам все аксессуары.`,
    `Даю недельную гарантию.`,
    `Если товар не понравится — верну всё до последней копейки.`,
    `Это настоящая находка для коллекционера!`,
    `Если найдёте дешевле — сброшу цену.`,
    `Таких предложений больше нет!`,
    `Две страницы заляпаны свежим кофе.`,
    `При покупке с меня бесплатная доставка в черте города.`,
    `Кажется, что это хрупкая вещь.`,
    `Мой дед не мог её сломать.`,
    `Кому нужен этот новый телефон, если тут такое...`,
    `Не пытайтесь торговаться. Цену вещам я знаю.`
];

const CATEGORIES = [
    `Книги`,
    `Разное`,
    `Посуда`,
    `Игры`,
    `Животные`,
    `Журналы`,
];

const OfferType = {
    offer: `offer`,
    sale: `sale`,
};

const SumRestrict = {
    min: 1000,
    max: 100000,
};

const PictureRestrict = {
    min: 1,
    max: 16,
};

module.exports = {
    DEFAULT_COUNT,
    FILE_NAME,
    MAX_PUBLICATIONS,
    TITLES,
    SENTENCES,
    DEFAULT_COMMAND,
    USER_ARGV_INDEX,
    CATEGORIES,
    ExitCode,
    OfferType,
    SumRestrict,
    PictureRestrict
};