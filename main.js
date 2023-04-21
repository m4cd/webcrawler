const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main(){
    if (process.argv.length < 3) {
        console.log("No arguments.")
    } 
    else if (process.argv.length > 3) {
        console.log("Too many arguments provided.")
    }
    else {
        baseURL = process.argv[2]
        const pages = await crawlPage(baseURL, baseURL, {})
        printReport(pages)
    }
}
  
main()  
