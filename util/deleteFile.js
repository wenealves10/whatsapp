const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');

async function deleteFile(file) {
  promisify(fs.unlink)(resolve(__dirname, '..', 'images', file));
}

module.exports = { deleteFile };
