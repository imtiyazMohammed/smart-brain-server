const clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: "09292841fe4d44eb9c0ba84598dc1064"
})


const handleApiCall = (req, res) => {
    app.models.predict(clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json("unable to work with api"))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('OOPS! Error occured!'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}