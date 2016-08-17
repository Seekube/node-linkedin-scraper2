import jsdom from 'jsdom';
import Q from 'q';

module.exports = function (originalUrl, callback) {
    var deferred = Q.defer();

    var profileFactory = require('./lib/profile');
    var linkedInURL = originalUrl.replace(/[a-z]*\.linkedin/, 'www.linkedin');

    var userAgents = [
        'Opera/9.80 (Windows NT 6.1; U; es-ES) Presto/2.9.181 Version/12.00',
        'Opera/9.80 (Windows NT 6.1; U; zh-tw) Presto/2.8.131 Version/11.10',
        'Opera/9.80 (Windows NT 5.1; U; zh-tw) Presto/2.8.131 Version/11.10',
        'Opera/9.80 (Windows NT 6.1; U; zh-tw) Presto/2.8.131 Version/12.10',
        'Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.21 (KHTML, like Gecko) konqueror/4.14.10 Safari/537.21',
        'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/28.0.1469.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'
    ];

    var parsing = function(counter) {
        jsdom.env({
            url: linkedInURL,
            scripts: ['http://code.jquery.com/jquery.js'],
            headers: {
                'Accept': 'text/html',
                //'Accept-Encoding': 'gzip',
                'Accept-Language': 'en-US;q=0.6,en;q=0.4',
                'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)]
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

                    if(profile.name == "" && counter <= 10){
                        var newCounter = counter + 1;
                        parsing(newCounter);
                    } else {
                        if (callback) {
                            callback(null, profile);
                        } else {
                            deferred.resolve(profile);
                        }
                    }

                }
            }
        });
    }

    // Start recursive function
    parsing(1);

    return deferred.promise;
};