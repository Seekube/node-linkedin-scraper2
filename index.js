var jsdom = require('jsdom'),
    Q = require('q'),
    randomUserAgent = require('random-useragent');

module.exports = function (originalUrl, callback) {
    var deferred = Q.defer();


    var profileFactory = require('./lib/profile');
    var linkedInURL = originalUrl.replace(/[a-z]*\.linkedin/, 'www.linkedin');

    jsdom.env({
        url: linkedInURL,
        scripts: ['http://code.jquery.com/jquery.js'],
        headers: {
            'Accept': 'text/html',
            //'Accept-Encoding': 'gzip',
            'Accept-Language': 'en-US;q=0.6,en;q=0.4',
            'User-Agent': randomUserAgent.getRandom()
        },
        proxy: process.env.PROXY_HOST,
        tunnel: process.env.PROXY_HOST ? false : undefined,
        done: function (errors, window) {
            if (errors) {
                if (callback) {
                    callback(errors);
                } else {
                    deferred.reject(errors);
                }
            } else {
                var profile = profileFactory(window);
                profile.publicProfileUrl = originalUrl;

                if (callback) {
                    callback(null, profile);
                } else {
                    deferred.resolve(profile);
                }
            }
        }
    });

    return deferred.promise;
};