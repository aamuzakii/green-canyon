const qrcode = require('qrcode-terminal');
const express = require('express')
const app = express()
const port = 9500
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth()
});
let isClientReady = false

client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    isClientReady = true
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();

app.get('/otp', (req, res) => {
  
  if (!isClientReady) {
    return res.send('Client not ready')
  }
  
  // http://localhost:9500/otp?number=85608704659&otp=123


  let cleanNumber = req.query.number
  let otp = req.query.otp
  const number = "+62" + cleanNumber;
 
  // Your message.
 const text = otp + " adalah kode OTP kamu. Kode OTP berlaku selama 5 menit.";

  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
 const chatId = number.substring(1) + "@c.us";

 // Sending message.
 client.sendMessage(chatId, text);
 res.send('OTP sent')

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})