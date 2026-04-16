const BASE_URL = "https://v6.exchangerate-api.com/v6/{Get your API key from ExchangeRate-API and paste here. Also remove {} }/latest/USD";

let userInput = document.querySelector("#userInput");
let fromCurrencySelect = document.querySelector("#fromBox select");
let toCurrencySelect = document.querySelector("#toBox select");
let fromImg = document.querySelector("#fromBox img");
let toImg = document.querySelector("#toBox img");
let rate = document.querySelector(".rate");
let btn = document.querySelector("button");


for (let currencyCode in countryList) {
    fromCurrencySelect.innerHTML += `<option>${currencyCode}</option>`;
    toCurrencySelect.innerHTML += `<option>${currencyCode}</option>`;
}



let fromSelection = () => {
    fromImg.src = `https://flagsapi.com/${countryList[fromCurrencySelect.value]}/flat/64.png`
}
let toSelection = () => {
    toImg.src = `https://flagsapi.com/${countryList[toCurrencySelect.value]}/flat/64.png`
}

fromCurrencySelect.addEventListener("change", fromSelection);
toCurrencySelect.addEventListener("change", toSelection);

let rates;

let datafunc = async () => {
    let res = await fetch(BASE_URL);
    let data = await res.json();
    console.log(data.conversion_rates);
    console.log(`fromRate ${fromCurrencySelect.value}: ${data.conversion_rates[fromCurrencySelect.value]}`);
    return data.conversion_rates;
};

btn.addEventListener("click", () => {

    let mainFunc = async () => {
        rates = await datafunc();
        let fromRate = rates[fromCurrencySelect.value];
        let toRate = rates[toCurrencySelect.value];
        console.log(`toRate ${toCurrencySelect.value}: ${rates[toCurrencySelect.value]}`);
        if (userInput.value <= 0) {
            rate.textContent = `Invalid amount`;
        } else {
            let exRate = Number((userInput.value * toRate) / fromRate);
            console.log(`${userInput.value} ${fromCurrencySelect.value} = ${exRate.toFixed(3)} ${toCurrencySelect.value}`);
            rate.textContent = `${userInput.value} ${fromCurrencySelect.value} = ${exRate.toFixed(3)} ${toCurrencySelect.value}`;
        }
    }
    mainFunc();
});
