const axios = require('axios')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const {Parser} = require('json2csv')
const fs = require('fs')
async function main(){
    const url = "https://www.imdb.com/search/title/?groups=top_250&sort=user_rating,desc";
    const res = await axios.get(url)
    // console.log(res.data)
    const dom = new JSDOM(res.data)
    const title = dom.window.document.getElementsByClassName('lister-item mode-advanced')
    // console.log(title[0].textContent)
    let movies = [];
    for(titles of title){
        const title1 = titles.getElementsByClassName('lister-item-index unbold text-primary')[0].textContent;
        const rating  = titles.getElementsByClassName('global-sprite rating-star imdb-rating')[0].textContent;
        //  const desc = titles.getElnoementsByClassName('text=muted')[0].textContent;
        movies.push({
            title1: title1.replace(/\n/g,'').replace(/ /g,' '),
            rating: rating.replace(/\n/g,'').replace(/ /g,' '),
            // desc: desc.replace(/\n/g,'').replace(/ /g,' '),
        });
    }
    const parser = new Parser({fields:['title', 'rating', ]});
    const csv = parser.parse(movies);
    fs.writeFileSync('./movies.csv',csv)
}
main()