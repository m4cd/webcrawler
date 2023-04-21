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
    return result
}

async function crawlPage(baseURL, currentURL, pages){
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if (baseURLObj.hostname != currentURLObj.hostname) {
        return pages
    }

    const currentURLNormalized = normalizedURL(currentURL)

    if (pages[currentURLNormalized] > 0) {
        pages[currentURLNormalized]++
        return pages
    }
    
    pages[currentURLNormalized] = 1

    console.log(`Crawling: ${currentURL}`)
    let html = ''
    try {
        const response = await fetch(baseURL)
        if (response.status >= 400) {
            console.log(`HTTP error: ${response.status} - ${response.statusText}`)
            return pages
        }
        if (!response.headers.get('content-type').includes("ext/html")) {
            console.log(`Incorrent content type: ${response.headers.get('content-type')}`)
            return pages
        }
        html = await response.text()
    } catch(err) {
        console.log(err.message)
    }

    for (let url of getURLsFromHTML(html, baseURL)) {
        pages = await crawlPage(baseURL, url, pages)
    }
    
    return pages
}

module.exports = {
    normalizedURL,
    getURLsFromHTML,
    crawlPage
}