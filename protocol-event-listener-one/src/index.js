const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const TrackerState = require('./models/tracker_state');
const connectDB = require('./db/mongoose');
const processTokenEvents = require('./services/insuranceTracker');
const connect = () => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', async () => {
        const result = await TrackerState.find({ contractAddress: process.env.CONTRACT_ADDRESS });
        if (!result.length) {
            await TrackerState.create({ contractAddress: process.env.CONTRACT_ADDRESS, lastBlockProcessed: process.env.START_BLOCK });
        }
        const trackContractCallback = async () => {
            const lastBlockRecord = await TrackerState.find({ contractAddress: process.env.CONTRACT_ADDRESS });
            await processTokenEvents(lastBlockRecord[0].lastBlockProcessed);
            setTimeout(() => trackContractCallback(), 10000);
        };
        await trackContractCallback();
    });
};
const app = express();
connectDB();
connect();
app.use(cors());
app.use(express.json());
app.get('/', async (_, res) => {
    try {
        res.send('<h1>EventListnerOne:Online</h1>');
    } catch (e) {
        res.status(500).send();
    }
});
const PORT = process.env.PORT;
const server = app.listen(PORT, () =>
    console.log(`Sever running on port ${PORT}`)
);
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});