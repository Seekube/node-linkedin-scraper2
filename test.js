const parsingUrl  = require('./dist/index').parsingUrl;
const url         = 'https://www.linkedin.com/in/mathieu-le-tyrant-a2438880';

parsingUrl(url, (err, profile) => {
    if (err) {
        console.log(err);
    } else {
        console.log(profile);
    }
});