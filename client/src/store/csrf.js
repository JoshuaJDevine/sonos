/*
//=====================\\
||INIT-----------------||
\\=====================//
 */
import Cookies from 'js-cookie';




/*
//=====================\\
||CONFIG---------------||
\\=====================//
 */
export async function csrfFetch(url, options = {}) {
    // enforce GET if no verb specified
    options.method = options.method || 'GET';
    // enforce options.headers empty object if there are no headers
    options.headers = options.headers || {};

    // if the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json", and set the "XSRF-TOKEN" header to the value of the
    // "XSRF-TOKEN" cookie
    if (options.method.toUpperCase() !== "GET") {
        if (options.headers["Content-Type"] === "multipart/form-data") {
            delete options.headers["Content-Type"];
        } else {
            options.headers["Content-Type"] =
                options.headers["Content-Type"] || "application/json";
        }
        options.headers["XSRF-Token"] = Cookies.get("XSRF-TOKEN");
    }

    // call the default window's fetch with the url and the options passed in
    //
    // console.log(url)
    // console.log(options)

    const res = await window.fetch(url, options);

    // if the response status code is 400 or above, then throw an error with the
    // error being the response
    if (res.status >= 400) throw res;

    // if the response status code is under 400, then return the response to the
    // next promise chain
    return res;
}






/*
//=====================\\
||EXPORT---------------||
\\=====================//
 */
export default csrfFetch;
export function restoreCSRF() { // call this to get the "XSRF-TOKEN" cookie, should only be used in development
    return csrfFetch('/api/csrf/restore');
}
