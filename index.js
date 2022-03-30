const PORT = 5000 // if you are using react don't use port 3000

const express = require('express')
const axios = require ('axios')
const cheerio = require('cheerio')
const { response } = require('express')

const app = express()

const articles = []

app.get('/sunny', (req, res) => {
    res.json('welcome to my lastest api that gives the data of ipl scores')
})

app.get("/scores", (req, response) => {
    axios.get('https://www.cricbuzz.com/live-cricket-scores/45906/5th-match-indian-premier-league-2022')
         .then((res) => { 
             const html = res.data
             const $ = cheerio.load(html)

             $('a:contains("live scores")', html).each(function() {
                 const runs = $(this).text()
                 const url = $(this).attr('href')
                 articles.push({
                     runs,
                     url,

                 })
             })
             response.json(articles)
            })
            .catch((err) => console.log(err))
            
})
app.listen(PORT, () => console.log(`server running in PORT ${PORT}`))