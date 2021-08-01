const path = require('path');
const fs = require('fs');

const envPaths = require('env-paths');
// const IMAP = require('imap');

const configPath = path.join(envPaths('jmap-proxy', {suffix: ''}).config, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath).toString());

const imap = new IMAP(config.imap);

imap.once('ready', () => {
  imap.getBoxes((err, boxes) => {
    if (err) console.error(err);
    console.log(boxes);
  });
  imap.end();
});

process.on('SIGINT', () => {
  console.log('shutting down');
  imap.end();
});

imap.connect();
