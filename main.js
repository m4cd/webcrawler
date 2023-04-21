const { crawlPage } = require('./crawl.js')

function main(){
    if (process.argv.length < 3) {
        console.log("No arguments.")
    } 
    else if (process.argv.length > 3) {
        console.log("Too many arguments provided.")
    }
    else {
        baseURL = process.argv[process.argv.length - 1]
        crawlPage(baseURL)
    }
}
  
main()  
