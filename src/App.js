import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [result, setResult] = useState("");

  const handleConvert = (event) => {
    event.preventDefault();

    const currency = event.target.currency.value;
    const amount = event.target.amount.value;

    if (amount <= 0) {
      alert("Proszę podać liczbę większą od zera.");
      return;
    }

    const url = `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.rates && data.rates.length > 0) {
          const exchangeRate = data.rates[0].mid;
          if (exchangeRate) {
            const convertedAmount = (amount * exchangeRate).toFixed(2);
            setResult(`${amount} ${currency} = ${convertedAmount} PLN`);
          }
        } else {
          setResult("Nieprawidłowa odpowiedź z interfejsu API.");
        }
      })
      .catch((error) => {
        setResult("Wystąpił błąd. Proszę spróbować później.");
      });
  };

  return (
    <div className="container">
      <h1 className="title">Przelicznik walut</h1>
      <form onSubmit={handleConvert}>
        <label className="currency-amount" htmlFor="currency">
          Wybierz walutę:
        </label>
        <select className="operator" name="currency" id="currency">
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="CHF">CHF</option>
        </select>

        <label className="currency-amount" htmlFor="amount">
          Wpisz kwotę:
        </label>
        <input className="operator" type="number" id="amount" />

        <button className="operator" type="submit">
          Przelicz
        </button>
      </form>

      {result ? (
        <>
          <h2>Rezultat:</h2>
          <div className="result" id="result">
            <p id="resultText">{result}</p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default App;
