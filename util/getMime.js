const mimeList = [
  {
    prefix: 'iVBORw0KGgo',
    mime: 'image/png',
  },
  {
    prefix: '/9j/',
    mime: 'image/jpeg',
  },
  {
    prefix: 'R0lGOD',
    mime: 'image/gif',
  },
  {
    prefix: 'UklGRg',
    mime: 'image/webp',
  },
  {
    prefix: 'AAAAIGZ0eXBpc29t',
    mime: 'video/mp4',
  },
];

function getMime(data) {
  // eslint-disable-next-line no-restricted-syntax
  for (const { prefix, mime } of mimeList) {
    if (data.startsWith(prefix)) { return mime; }
  }
}

module.exports = { getMime };
