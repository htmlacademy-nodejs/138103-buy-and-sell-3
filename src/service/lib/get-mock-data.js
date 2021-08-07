'use strict';

const fs = require(`fs`).promises;
const {
  FILENAME
} = require(`../../constants`);
let data = null;

const getMockData = async () => {
  if (data !== null) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(FILENAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    console.error(err);
    Promise.reject(err);
  }

  return data;
};

module.exports = {
  getMockData
};
