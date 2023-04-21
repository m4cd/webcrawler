
function printReport(pages) {
    console.log(`======\nReport\n======`)
    let items = Object.keys(pages).map((key) => { return [key, pages[key]] })

    for (let item of items) {
        console.log(`Found ${item[1]} internal links to ${item[0]}`)
    }
}

module.exports = {
    printReport
}