// const { Telegraf } = require("telegraf");
const { Composer } = require("micro-bot");
const axios = require("axios");

// const bot = new Telegraf("5660142678:AAE0U3ygvcvkNnFz14Zie1MD_vyHDHo_J3w");
const bot = new Composer;
//while deploying you have to keep file name index.js
//herpku app=heroku project=heroku dyno
// salty-sands-73698
// https://salty-sands-73698.herokuapp.com/

//rest all will be same
//commands
bot.start((ctx)=>{
    ctx.reply("Bot Started")
});

bot.command("covid",(ctx)=>{
    // ctx.reply("covid stats")//is a shortcut command for ctx.telegram.sendMessage
    // ctx.telegram.sendMessage(ctx.chat.id,"<b>covid <u>stats</u></b>",
    // {
    //     parse_mode:"HTML"
    // });
    ctx.telegram.sendMessage(ctx.chat.id,"covid stats",
    {
        reply_markup:{
            inline_keyboard:[
                [{text:"Delhi",callback_data:"DL"},{text:"Maharashtra",callback_data:"MH"}],
                [{text:"Madhya Pradesh",callback_data:"MP"}]
            ]
        }
    });
});

bot.action("DL",(ctx)=>{
    ctx.deleteMessage();
    let statecode = ctx.match;
    getData(statecode)
    .then((result)=>{
        ctx.telegram.sendMessage(ctx.chat.id,result,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"Go back to Menu",callback_data:"go-back"}]
                ]
            }
        });
    });
});

bot.action("MH",(ctx)=>{
    ctx.deleteMessage();
    let statecode = ctx.match;
    getData(statecode)
    .then((result)=>{
        ctx.telegram.sendMessage(ctx.chat.id,result,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"Go back to Menu",callback_data:"go-back"}]
                ]
            }
        });
    });
});

bot.action("MP",(ctx)=>{
    ctx.deleteMessage();
    let statecode = ctx.match;
    getData(statecode)
    .then((result)=>{
        ctx.telegram.sendMessage(ctx.chat.id,result,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"Go back to Menu",callback_data:"go-back"}]
                ]
            }
        });
    });
});
bot.action("go-back",(ctx)=>{
    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id,"covid stats",
    {
        reply_markup:{
            inline_keyboard:[
                [{text:"Delhi",callback_data:"DL"},{text:"Maharashtra",callback_data:"MH"}],
                [{text:"Madhya Pradesh",callback_data:"MP"}]
            ]
        }
    });
});

async function getData(statecode){
    let url = "https://api.covid19india.org/v4/min/data.min.json";
    let res = await axios.get(url)
    let cases = eval(`res.data.${statecode}.total`);
    let results = `Cases in ${statecode}:
Confirmed Cases: ${cases.confirmed}
Deceased Cases: ${cases.deceased}
Recovered: ${cases.recovered}
Tested: ${cases.tested}`

    // console.log(results);
    return results;
}

// bot.launch();
module.exports = bot;

//inline bots : @botname query
//dev.to api