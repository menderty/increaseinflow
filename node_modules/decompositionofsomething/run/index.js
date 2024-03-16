const crypto = require('crypto');


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(crypto.randomBytes(32).readUInt32BE(0) / (0x100000000 / (max - min + 1))) + min;
}

module.exports = getRandomInt;
console.log(getRandomInt(1, 5));