const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle wares
app.use(express.json());
app.use(cors());

//all currencies
app.get("/getAllCurrencies", async (req, res) => {
    const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=60e62e3285754268a757fe3ccbb62a81";

    try {

        const nameResponse = await axios.get(nameURL);
        const nameData = nameResponse.data;

        return res.json(nameData);

    } catch { err } {
        console.error(err);
    }
});

//get the target amount

app.get("/convert", async (req, res) => {
    const {date,sourceCurrency,targetCurrency,amountInSourceCurrency,} =
    req.query;

    try{
        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=60e62e3285754268a757fe3ccbb62a81`;

        const dataResponse = await axios.get(dataURL);
        const rates =dataResponse.data.rates;

        //rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        //target
        const targetAmount = [targetRate/sourceRate] * amountInSourceCurrency;

        return res.json(targetAmount.toFixed(2));

    }catch(err){
        console.error(err);
    }
});

//listen to a port
app.listen(5000, () => {
    console.log('Server is running on Port 5000');
});