#!/usr/bin/env node

const http = require('http');
const config = require('dotenv').config();
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');


const argv = yargs(hideBin(process.argv)).argv;
const city = argv._.join(' ') || 'New York';
const url = `http://api.weatherstack.com/current?access_key=${config.parsed.myAPIKey}&query=${city}`;

http.get(url, (res) => {
    const {statusCode} = res;

    if (statusCode === 602) {
      console.log('no result')
    }

    if (statusCode === 615) {
      console.log('I don\'t know this city')
    }

    if (statusCode === 200) {
      res.setEncoding('utf-8');
      let rowData = '';
      res.on('data', (chunk) => {
          rowData += chunk;
      })
      res.on('end', () => {
          let parseData = JSON.parse(rowData);
          if (parseData?.success === false) {
            console.log('I don\'t know this city')
          } else {
            console.log(parseData)
          }
      })
    } else {
      console.log('mystical mistake');
    }
})
