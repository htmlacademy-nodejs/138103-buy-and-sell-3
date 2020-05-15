'use strict';

const {
    getRandomInt,
    shuffle,
} = require(`../../utils`);

const {
    DEFAULT_COUNT,
    FILENAME,
    MAX_PUBLICATIONS,
    PictureRestrict,
    SumRestrict,
    OfferType
} = require(`../../constants`);

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const getPictureFileName = (number) => `item${number.toString().padStart(2, 0)}.jpg`;

const createDescription = (sentences) => {
    return Array(getRandomInt(1, 5)).fill('').map(() => sentences[getRandomInt(0, sentences.length - 1)]).join(` `);
}

const readContent = async (filePath) => {
    try {
        const content = await fs.readFile(filePath, `utf8`);
        return content.split(`\n`);
    } catch (err) {
        console.error(chalk.red(err));
        return [];
    }
};

const generateOffers = (count, sentences, titles, categories) => {
    return Array(count).fill({}).map(() => ({
        title: titles[getRandomInt(0, titles.length - 1)],
        picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
        description: createDescription(sentences),
        type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
        sum: getRandomInt(SumRestrict.min, SumRestrict.max),
        category: [categories[getRandomInt(0, categories.length - 1)]],
    }))
};

module.exports = {
    name: `--generate`,
    async run(args) {
        const sentences = await readContent(FILE_SENTENCES_PATH);
        const titles = await readContent(FILE_TITLES_PATH);
        const categories = await readContent(FILE_CATEGORIES_PATH);

        const [count] = args;
        const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
        if (countOffer <= MAX_PUBLICATIONS) {
            const content = JSON.stringify(generateOffers(countOffer, sentences, titles, categories));
            try {
                await fs.writeFile(FILENAME, content);
                console.info(chalk.green(`Operation success. File created.`));
                process.exit(1);
            } catch (err) {
                console.info(chalk.red(err, `Can't write data to file...`));
                process.exit(1);
            }
        } else {
            console.info(chalk.red('Не более 1000 объявлений'));
            process.exit();
        }
    }
}