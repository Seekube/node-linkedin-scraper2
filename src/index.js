import profileFactory from './lib/profile';
import { userAgents } from './helpers';
import jsdom from 'jsdom';
import Q from 'q';

/**
 * Export URL
 */
export const parsingUrl = (url, callback) => {

    const deferred    = Q.defer();
    const linkedInURL = url.replace(/[a-z]*\.linkedin/, 'www.linkedin');

    const parsing = (counter) => {

        jsdom.env({
            url: linkedInURL,
            scripts: ['http://code.jquery.com/jquery.js'],
            headers: {
                'Accept'         : 'text/html',
                'Accept-Language': 'en-US;q=0.6,en;q=0.4',
                'User-Agent'     : userAgents()
            },
            proxy: process.env.PROXY_HOST,
            tunnel: process.env.PROXY_HOST ? false : undefined,
            done: (errors, window) => {

                // If we have errors, return errors
                if(errors) {
                    if(callback){
                        return callback(errors);
                    }
                    return deferred.reject(errors);
                }

                // Get the profile
                const profile = profileFactory(window);
                profile.publicProfileUrl = url;

                if(profile.name == "" && counter <= 10){
                    parsing(counter + 1);
                }
                else {
                    if (callback) {
                        return callback(null, profile);
                    }

                    deferred.resolve(profile);
                }

            }
        });
    }

    // Start recursive function
    parsing(1);

    return deferred.promise;
}