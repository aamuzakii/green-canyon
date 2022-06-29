const qrcode = require('qrcode-terminal');
const express = require('express')
const app = express()
const port = 9500
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    const number = "+6283894588105";

    // Your message.
   const text = "Hey john";
  
    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
   const chatId = number.substring(1) + "@c.us";
  
   // Sending message.
   client.sendMessage(chatId, text);
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})