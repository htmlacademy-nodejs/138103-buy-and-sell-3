'use strict';

const {
    getRandomInt,
    shuffle,
} = require(`../../utils`);

const {
    DEFAULT_COUNT,
    FILE_NAME,
    MAX_PUBLICATIONS,
    TITLES,
    SENTENCES,
    CATEGORIES,
    PictureRestrict,
    SumRestrict,
    OfferType
} = require(`../../constants`);

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const getPictureFileName = (number) => `item${number.toString().padStart(2, 0)}.jpg`;

function createDescription() {
    return Array(getRandomInt(1, 5)).fill('').map(() => SENTENCES[getRandomInt(0, SENTENCES.length - 1)]).join(` `);
}

const generateOffers = (count) => (
    Array(count).fill({}).map(() => ({
        title: TITLES[getRandomInt(0, TITLES.length - 1)],
        picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
        description: createDescription(),
        type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
        sum: getRandomInt(SumRestrict.min, SumRestrict.max),
        category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    }))
);

module.exports = {
    name: `--generate`,
    async run(args) {
        const [count] = args;
        const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

        if (countOffer <= MAX_PUBLICATIONS) {
            const content = JSON.stringify(generateOffers(countOffer));
            try {
                await fs.writeFile(FILE_NAME, content);
                console.info(chalk.green(`Operation success. File created.`));
                process.exit(1);
            } catch (err) {
                console.info(chalk.red(`Can't write data to file...`));
                process.exit(1);
            }
        } else {
            console.info(chalk.red('Не более 1000 объявлений'));
            process.exit();
        }
    }
}