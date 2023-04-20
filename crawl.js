function normalizedURL(url) {
    const newUrl = new URL(url)
    let fullPath = `${newUrl.hostname}${newUrl.pathname}`
    if (fullPath.slice(-1) == "/") {
        fullPath = fullPath.slice(0, -1)
    }
    
    return fullPath
}

//url = "wagSlane.dev/path/"
//normalizedURL(url)

module.exports = {
    normalizedURL
}