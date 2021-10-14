const Card = require("../models/Card")
const wrapedSendMail = require('../config/sendMail')
const cardControllers = {
  addCard: async (req, res) => {
    try {
      if (!req.session.loggedUser) throw new Error("Log In First")
      const user = req.session.loggedUser
      const { balances } = req.body
      var savedCards = []
      const saveCards = (balance) => {
        return new Promise(async (resolve, reject) => {
          setTimeout(async ()=>{
            let newCode = Date.now()
            let newCard = new Card({
              balance: balance.balance,
              code: newCode,
            })
            let savedCard = await newCard.save()
            resolve(savedCard)
          },Math.random()*5000)
        })
      }
      savedCards = await Promise.all(balances.map(async (balance) => {
        let savedCard = await saveCards(balance)
        return savedCard
      }))
      let cardLinks = ["https://i.imgur.com/7HE3LXO.png", "https://i.imgur.com/yk2qPdn.png", "https://i.imgur.com/69Zlp7W.png", "https://i.imgur.com/zy3LTCk.png"]
      savedCards.forEach(card => {
        switch(card.balance){
          case 25:
            card.cardBought = cardLinks[0]
            break
          case 50:
            card.cardBought = cardLinks[1]
            break
          case 75:
            card.cardBought = cardLinks[2]
            break
          case 100:
            card.cardBought = cardLinks[3]
            break
        }
      })
      let cardDetails = savedCards.map(card => {
        return(
          `
            <ul style="font-size: 15px;  margin: 10px 0">
              <li style="color: #000;">Name: GIFT - CARD</li>
              <li style="color: #000;">Price: ${card.balance}</li>
              <li style="color: #000;">Code: ${card.code} </li>
            </ul>
          `
        )
      })
      let cardImages = savedCards.map(card => `<img src=${card.cardBought} style="width: 100px;"/>`)
      let message = `
                    <table style="max-width: 700px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                        <div style="width: 100%;margin:20px 0; text-align: center;">
                            <img src="https://cozydeco.herokuapp.com/c.png" style="width: 100px;"/>
                        </div>
                        <tr>
                            <td style="background-color: #F0F3F5">
                                <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                                    <h1 style="color: #dabea8; margin: 0 0 7px">Hello ${user.firstName} ${user.lastName}:</h1>
                                    <div style="width: 400px;text-align: center;">
                                      ${cardImages}  
                                    </div>
                                    <p style="margin: 2px; font-size: 15px; color: #000">
                                            We sent you this e-mail to let you know your purchase was successfully done<br>
                                    </p>
                                    <h2 style="color: #dabea8;">Details of your purchase:</h2>
                                      ${cardDetails}
                                    <h2 style="margin: 0 0 7px; color: #dabea8">Also:</h2>
                                    <p style="margin: 2px; font-size: 15px; color: #000;">
                                        Have a good day and continue shopping anytime soon!
                                    </p>
                                    <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center; background-color: #dabea8;">
                                    <a style="text-decoration: none; color: white;" href=""><p style="color: #fff; font-size: 14px; text-align: center;">© Copyright 2021 | Cozy Deco.</p></a>	
                                </div>
                            </td>
                        </tr>
                    </table>
                `
      let mailOptions = {
        from: "Cozy <cozydecodesign@gmail.com>",
        to: `${user.firstName} <${user.eMail}>`,
        subject: `Thank you for your purchase ${user.firstName}!`,
        html: message,
      }
      let mailResp = await wrapedSendMail(mailOptions);
      if(!mailResp)throw new Error('Gift Card created, mail not sent')
      res.json({success: true, response: savedCards})
    } catch (e) {
      res.json({ success: false, response: e.message })
    }
  },
  getCard: async (req, res) => {
    try {
      let card = await Card.findOne({ code: req.params.id })
      if (!card) throw new Error("Card not found")
      if (card.balance === 0) throw new Error("Your balance is 0")
      res.json({ success: true, response: card })
    } catch (e) {
      res.json({ success: false, response: e.message })
    }
  },
  getCards: async (req, res) => {
    try {
      let cards = await Card.find()
      res.json({ success: true, response: cards })
    } catch (e) {
      res.json({ success: false, response: e.message })
    }
  },
  editCard: async (req, res) => {
    try {
      let editedCard = await Card.findOneAndUpdate(
        { code: req.params.id },
        { ...req.body },
        { new: true }
      )
      if (!editedCard) throw new Error("Card not found")
      res.json({ success: true, response: editedCard })
    } catch (e) {
      res.json({ success: false, response: e.message })
    }
  },
  deleteCard: async (req, res) => {
    try {
      let deletedCard = await Card.findOneAndDelete({ _id: req.params.id })
      if (!deletedCard) throw new Error("Card not found")
      res.json({ success: true, response: deletedCard })
    } catch (e) {
      res.json({ success: false, response: e.message })
    }
  },
}
module.exports = cardControllers