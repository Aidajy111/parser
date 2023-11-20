
const puppeteer = require('puppeteer');

(async () => {
    try {
 
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://nb-bet.com/Teams');

        let arr = await page.evaluate(() => {
            let Commands = Array.from(document.querySelectorAll('.sc-1ca4419d-4 div div:first-child div'), el => el.innerText).slice(0,50)
            let matches = Array.from(document.querySelectorAll('.sc-1ca4419d-4 div div:last-child div:first-child'), el => el.innerText).slice(0,50)
            let total = Array.from(document.querySelectorAll('.sc-1ca4419d-4 div div:last-child div:nth-child(2)'), el => el.innerText).slice(0,50)
            let goals = Array.from(document.querySelectorAll('.sc-1ca4419d-4 div div:last-child div:nth-child(3)'), el => el.innerText).slice(0,50)
            let misseds = Array.from(document.querySelectorAll('.sc-1ca4419d-4 div div:last-child div:last-child'), el => el.innerText).slice(0,50)

            let contentArrCommands = JSON.stringify(Object.assign({},Commands), null, 4)
            let contentArrMatches = JSON.stringify(Object.assign({},matches), null, 4)
            let contentArrTotal = JSON.stringify(Object.assign({},total), null, 4)
            let contentArrGoals = JSON.stringify(Object.assign({},goals), null, 4)
            let contentArrMisseds = JSON.stringify(Object.assign({},misseds), null, 4)

            let MainContent = "\n\n\n" + "Команды: "+ "\n" +contentArrCommands + "\n\n\n" + "Количество матчей: " + "\n" + contentArrMatches + "\n\n\n" + "Тотал матча: " + "\n" + contentArrTotal +"\n\n\n" + "Забитые голы: " + "\n" + contentArrGoals +"\n\n\n" + "Пропущенные голы: " + "\n" + contentArrMisseds +"\n\n\n"
            return MainContent
        })

        console.log(arr)

        await browser.close()        
    } catch(err) {
        console.log(err)
    }
}) ()