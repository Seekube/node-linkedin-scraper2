# node-linkedin-scraper2

A simple LinkedIn profile scraper for nodejs, based on original [linkedin-scraper](https://github.com/aadisriram/nodejs-linkedin-scraper).

### Usage

#### with callback function
```javascript
// Scrape a linkedin profile for the public contents
const parsingUrl = require('linkedin-scraper2').parsingUrl;
const url = 'https://www.linkedin.com/in/[user]';

parsingUrl(url, (err, profile) => {
    if (err) {
        return console.log(err);
    }

    // Success
    console.log(profile);
});
```

#### with promise
```javascript
// Scrape a linkedin profile for the public contents
const parsingUrl = require('linkedin-scraper2').parsingUrl;
const url = 'https://www.linkedin.com/in/[user]';

parsingUrl(url)
    .then((profile) => {
        console.log(profile);
    })
    .catch((err) => {
        console.log(err);
    });

```

#### output

http://pastebin.com/629RHwTa