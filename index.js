const TelegramBot = require('node-telegram-bot-api');

const dotenv = require('dotenv');
const { default: axios, options } = require('axios');

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
    polling: true, request: {

        agentOptions: {
            socksHost: process.env.PROXY_SOCKS5_HOST,
            socksPort: parseInt(process.env.PROXY_SOCKS5_PORT),
            // If authorization is needed:
            // socksUsername: process.env.PROXY_SOCKS5_USERNAME,
            // socksPassword: process.env.PROXY_SOCKS5_PASSWORD
        }
    }
});

// bot.on('message', (Option) => {
//     console.log("Message received on the Bot", Option);

//     bot.sendMessage(Option.chat.id, "Hello I am a bot. I am here to help you with your queries. Please type /help to know more about me.")
// })

bot.onText(/\/joke/, async (Option) => {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');

    const setUp = response.data.setup;
    const punchline = response.data.punchline;

    bot.sendMessage(Option.chat.id, setUp + "," + punchline);

    console.log(response);

})