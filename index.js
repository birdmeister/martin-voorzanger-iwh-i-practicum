const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please include the private app access token in your repo BUT only an access token built in a TEST ACCOUNT. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = 'pat-eu1-b1c62847-26b2-49d5-8e05-74b051777db5';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here

// * Code for Route 2 goes here
app.get('/update-cobj', async (req, res) => {
    const objectType = "2-114418761";
    const objectId = "1253467615";
    const pageTitle = "Update Custom Object Form | Integrating With HubSpot I Practicum";

    const getSong = `https://api.hubapi.com/crm/v3/objects/${objectType}/${objectId}?properties=name,release_date,length,average_rating,spotify_plays`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(getSong, { headers });
        const data = response.data;

        // res.json(data);
        res.render('updates', { pageTitle: pageTitle, name: data.properties.name, releaseDate: data.properties.release_date, length: data.properties.length, averageRating: data.properties.average_rating, spotifyPlays: data.properties.spotify_plays });

    } catch (err) {
        console.error(err);
    }
});

// * Code for Route 3 goes here
app.post('/update-cobj', async (req, res) => {
    const update = {
        properties: {
            "name": req.body.name,
            "length": req.body.length,
            "average_rating": req.body.average_rating
        }
    }

    const objectType = "2-114418761";
    const objectId = "1253467615";

    const updateSong = `https://api.hubapi.com/crm/v3/objects/${objectType}/${objectId}`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.patch(updateSong, update, { headers });
        res.redirect('back');
    } catch (err) {
        console.error(err);
    }

});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));