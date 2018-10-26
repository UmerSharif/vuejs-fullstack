const express = require('express');
const Bodyparser = require('body-parser');
const Cors = require('cors');

const app = express();


// middle wares
app.use(Bodyparser.json());
app.use(Cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

//handle production

if(process.env.NODE_ENV === 'production') {

    // use static folder
    app.use(express.static(__dirname + '/public'));

    //handle spa

    app.get(/.*/, (req, res) => res.sendFile(__dirname, '/public/index.html'));
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started at port ${port}`));