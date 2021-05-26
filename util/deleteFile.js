const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');

async function deleteFile(file) {
  promisify(fs.unlink)(resolve(__dirname, '..', 'images', file));
}

async function deleteMusic(file) {
  promisify(fs.unlink)(resolve(__dirname, '..', 'music', file));
}

module.exports = { deleteFile, deleteMusic };
