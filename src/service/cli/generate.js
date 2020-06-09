'use strict';

const {
  getRandomInt,
  shuffle
} = require(`../../utils`);

const {
  DEFAULT_COUNT,
  FILENAME,
  MAX_PUBLICATIONS,
  PictureRestrict,
  SumRestrict,
  OfferType,
  MAX_ID_LENGTH
} = require(`../../constants`);

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const MAX_COMMENTS = 4;

const getPictureFileName = (number) => `item${number.toString().padStart(2, 0)}.jpg`;

const createDescription = (sentences) => {
  return Array(getRandomInt(1, 5)).fill(``).map(() => sentences[getRandomInt(0, sentences.length - 1)]).join(` `);
};

const generateComments = (count, comments) => {
  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `)
  }));
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, sentences, titles, categories, comments) => {
  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    description: createDescription(sentences),
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    category: [categories[getRandomInt(0, categories.length - 1)]],
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer <= MAX_PUBLICATIONS) {
      const content = JSON.stringify(generateOffers(countOffer, sentences, titles, categories, comments));
      try {
        await fs.writeFile(FILENAME, content);
        console.info(chalk.green(`Operation success. File created.`));
        process.exit(1);
      } catch (err) {
        console.info(chalk.red(err, `Can't write data to file...`));
        process.exit(1);
      }
    } else {
      console.info(chalk.red(`Не более 1000 объявлений`));
      process.exit();
    }
  }
};
