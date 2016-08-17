# node-linkedin-scraper2

A simple LinkedIn profile scraper for nodejs, based on original [linkedin-scraper](https://github.com/aadisriram/nodejs-linkedin-scraper).

### Usage

#### with callback function
```javascript
// Scrape a linkedin profile for the public contents
const parsingUrl = require('linkedin-scraper').parsingUrl;
const parsingDom = require('linkedin-scraper').parsingDom;
const url = 'https://www.linkedin.com/in/[user]';

parsingUrl(url, (err, profile) => {
    if (err) {
        console.log(err);
    } else {
        console.log(profile);
    }
});

parsingDom(window, (err, profile) => {
    if (err) {
        console.log(err);
    } else {
        console.log(profile);
    }
});

```

#### with promise
```javascript
// Scrape a linkedin profile for the public contents
const parsingUrl = require('linkedin-scraper').parsingUrl;
const parsingDom = require('linkedin-scraper').parsingDom;
const url = 'https://www.linkedin.com/in/[user]';

parsingUrl(url)
    .then((profile) => {
        console.log(profile);
    })
    .catch((err) => {
        console.log(err);
    });

parsingDom(window)
    .then((profile) => {
        console.log(profile);
    })
    .catch((err) => {
        console.log(err);
    });
```

#### output

http://pastebin.com/629RHwTa