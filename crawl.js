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

async function crawlPage(baseURL){
    console.log(`Crawler starting at base url: ${baseURL}`)
    try {
        const response = await fetch(baseURL, {
            method: "GET",
            mode: "cors"
        })
        if (response.status >= 400) {
            console.log(`HTTP error: ${response.status} - ${response.statusText}`)
        }
        if (response.headers.get('content-type').slice(0, 9) !== "text/html") {
            console.log(`Incorrent content type: ${response.headers.get('content-type')}`)
        } else {
            console.log(await response.text())
        }
    } catch(err) {
        console.log(err.message)
    }
    
    //console.log(`status ${response.status} : ${response.statusText}`)
    //console.log(response)
}

module.exports = {
    normalizedURL,
    getURLsFromHTML,
    crawlPage
}