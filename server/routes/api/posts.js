const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


//Get POST

router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});


//ADD POST
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()

    });
    res.status(201).send()
});
// Delete POST

router.delete('/:id', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();

});


async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb://umer:umer1234@ds159489.mlab.com:59489/vue_express_post', {useNewUrlParser: true});
    return client.db('vue_express_post').collection('posts');
}

module.exports = router;