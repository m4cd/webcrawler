const { JSDOM } = require('jsdom')

function normalizedURL(url) {
    const newUrl = new URL(url)
    let fullPath = `${newUrl.hostname}${newUrl.pathname}`
    if (fullPath.slice(-1) == "/") {
        fullPath = fullPath.slice(0, -1)
    }
    
    return fullPath
}

function getURLsFromHTML(htmlBody, baseURL){
    const dom = new JSDOM(htmlBody)
    const aTags = dom.window.document.querySelectorAll('a')
    let result = []
    for (a of aTags) {
        if (a.href.slice(0,1) == "/") {
            result.push(baseURL + a.href)
        }
        else if (a.href.slice(0, baseURL.length) === baseURL){
            result.push(a.href)
        }
    }
    console.log(result)
    return result
}

module.exports = {
    normalizedURL,
    getURLsFromHTML
}