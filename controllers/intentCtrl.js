module.exports.index = (req, res) => {
    res.json({intents: [{intent: 'light-turn-on'}]})
}