'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parsingDom = exports.parsingUrl = undefined;

var _profile = require('./lib/profile');

var _profile2 = _interopRequireDefault(_profile);

var _helpers = require('./helpers');

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Export URL
 */
var parsingUrl = exports.parsingUrl = function parsingUrl(url, callback) {

    var deferred = _q2.default.defer();
    var linkedInURL = url.replace(/[a-z]*\.linkedin/, 'www.linkedin');

    var parsing = function parsing(counter) {

        _jsdom2.default.env({
            url: linkedInURL,
            scripts: ['http://code.jquery.com/jquery.js'],
            headers: {
                'Accept': 'text/html',
                'Accept-Language': 'en-US;q=0.6,en;q=0.4',
                'User-Agent': (0, _helpers.userAgents)()
            },
            proxy: process.env.PROXY_HOST,
            tunnel: process.env.PROXY_HOST ? false : undefined,
            done: function done(errors, window) {

                // If we have errors, return errors
                if (errors) {
                    if (callback) {
                        return callback(errors);
                    }
                    return deferred.reject(errors);
                }

                // Get the profile
                var profile = (0, _profile2.default)(window);
                profile.publicProfileUrl = url;

                if (profile.name == "" && counter <= 10) {
                    parsing(counter + 1);
                } else {
                    if (callback) {
                        return callback(null, profile);
                    }

                    deferred.resolve(profile);
                }
            }
        });
    };

    // Start recursive function
    parsing(1);

    return deferred.promise;
};

/**
 * Export DOM
 */
var parsingDom = exports.parsingDom = function parsingDom(window, callback) {

    var deferred = _q2.default.defer();

    var profile = (0, _profile2.default)(window);
    profile.publicProfileUrl = url;

    if (callback) {
        return callback(null, profile);
    }

    deferred.resolve(profile);

    return deferred.promise;
};