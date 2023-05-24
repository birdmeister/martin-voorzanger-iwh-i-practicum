const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please include the private app access token in your repo BUT only an access token built in a TEST ACCOUNT. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = 'pat-eu1-b1c62847-26b2-49d5-8e05-74b051777db5';

const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    'Content-Type': 'application/json',
}
const objectType = "2-114418761";
const baseURL = `https://api.hubspot.com/crm/v3/objects/${objectType}`;
const properties = "name,release_date,length,average_rating,spotify_plays";

// * Code for Route 1 goes here
app.get('/', async (req, res) => {
    const songs = `${baseURL}?properties=${properties}`
    try {
        const response = await axios.get(songs, { headers });
        const data = response.data.results;
        res.render('homepage', { title: 'Songs | HubSpot APIs', data });
    } catch (error) {
        console.error(error);
    }

});

// * Code for Route 2 goes here
app.get('/update-cobj', async (req, res) => {
    const objectId = "1253467615";
    const pageTitle = "Update Custom Object Form | Integrating With HubSpot I Practicum";

    const song = `${baseURL}/${objectId}?properties=${properties}`

    try {
        const response = await axios.get(song, { headers });
        const data = response.data;

        res.render('updates', { pageTitle: pageTitle, name: data.properties.name, releaseDate: data.properties.release_date, length: data.properties.length, averageRating: data.properties.average_rating, spotifyPlays: data.properties.spotify_plays });

    } catch (err) {
        console.error(err);
    }
});

// * Code for Route 3 goes here
app.post('/update-cobj', async (req, res) => {
    const newSong = {
        properties: {
            "name": req.body.name,
            "release_date": req.body.release_date,
            "length": req.body.length,
            "average_rating": req.body.average_rating,
            "spotify_plays": req.body.spotify_plays,
        }
    }

    try {
        await axios.post(baseURL, JSON.stringify(newSong), { headers });
        res.redirect('/');
    } catch (err) {
        console.error(err);
    }

});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));