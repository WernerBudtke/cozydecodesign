const Card = require("../models/Card")
const cardControllers = {
  addCard: async (req, res) => {
    console.log(req.body)
    try {
      if (!req.session.loggedUser) throw new Error("Log In First")
      // if(!req.session.loggedUser.owner)throw new Error("You don't have permissions to do this")
      const { balance } = req.body
      let newCode = Date.now()
      let newCard = new Card({
        // balance: parseInt(balance),
        balance,
        code: newCode,
      })
      let savedCard = await newCard.save()
      res.json({ success: true, response: savedCard })
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
