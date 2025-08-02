const pinataSDK = require("@pinata/sdk");
require("dotenv").config();

const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

const pinFileToIPFS = (readableStream, fileName) => {
  const options = {
    pinataMetadata: {
      name: fileName,
    },
  };
  return pinata.pinFileToIPFS(readableStream, options);
};

module.exports = { pinFileToIPFS };
