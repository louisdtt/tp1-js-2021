import fastify from 'fastify';
// see axios doc on how to use it
import axios from 'axios';

const app = fastify({ logger: true });

// Run the server!
const start = async () => {
  try {
    await app.listen(5000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

// Post in '/' routes

app.post('/', async (req) => {
  const country = req.body.countryCode;
  const catFacts = await getCatFacts();
  const foxPic = await getFox();
  const holidays = await getDays(country);

  return {
    foxPic: foxPic,
    catFacts: catFacts.map((cat) => cat.text),
    holidays: holidays,
  };
});

// Retrieve cat facts

async function getCatFacts() {
  try {
    const response = await axios({
      url: 'https://cat-fact.herokuapp.com/facts/random?amount=3',
      method: 'GET',
    });
    return response.data;
  } catch (e) {
    return null;
  }
}

// Retrieve fox image

async function getFox() {
  try {
    const response = await axios({
      url: 'https://randomfox.ca/floof/',
      method: 'GET',
    });
    return response.data.image;
  } catch (e) {
    return null;
  }
}

// Retrieve holidays based on contrycode input

async function getDays(country) {
  try {
    const response = await axios({
      url: `https://date.nager.at/api/v2/PublicHolidays/2021/${country}`,
      method: 'GET',
    });
    return response.data;
  } catch (e) {
    return null;
  }
}
