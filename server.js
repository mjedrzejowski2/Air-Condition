import express from 'express'
import axios from 'axios'

const app = express();
const port = 8000;


app.use(express.static('public'));

// Endpoint dla wszystkich stacji

app.get('/api/stations', async (req, res) => {
    try {
        const response = await axios.get('https://api.gios.gov.pl/pjp-api/rest/station/findAll');
        res.json(response.data)
    } catch (error) {
        res.status(500).json({ error: 'Błąd pobierania stacji'})
    }
});



app.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`)
})