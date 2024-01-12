const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function getData() {
    let my_obj = [];
    const browser = await puppeteer.launch({ headless : false });
    const page = await browser.newPage();
    await page.goto("https://rahavard365.com/stock?keyword=");
    let html = await page.content();
    let $ = await cheerio.load(html);
    $("a").each((index,item) => {
        let item_href = $(item).attr("href");
        if (item_href.search("/asset/") >= 0) {
            my_obj.push({
                name : $(item).text(),
                url : item_href
            })
        }
    });
    console.log(my_obj);
}

getData();