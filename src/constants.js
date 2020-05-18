const DEFAULT_COUNT = 1;
const DEFAULT_COMMAND = `--generate`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
    success: 0,
    error: 1
};
const FILE_NAME = `mocks.json`;
const MAX_PUBLICATIONS = 1000;

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
    DEFAULT_COMMAND,
    USER_ARGV_INDEX,
    ExitCode,
    OfferType,
    SumRestrict,
    PictureRestrict
};