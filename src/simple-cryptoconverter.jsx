import React, { useState, useCallback, useMemo, useEffect } from "react";

import {
  useDebounce,
  useInterval,
  BASE_URL,
  currencyOptions,
  round,
} from "./utils";


const SimpleCryptoConverter = () => {
  const [latestConverstion, setLatestConversion] = useState(null);
  const [conversionAmount, setConversionAmount] = useState("");
  const [currentConversion, setCurrentConversion] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [conversionError, setConversionError] = useState(null);

  const fetchCurrency = useCallback(async () => {
    if (!selectedCurrency) return;

    const url = `${BASE_URL}/${selectedCurrency}`;
    try {
      const response = await fetch(url);
      const converstionRate = await response.json();
      return converstionRate;
    } catch (e) {
      setConversionError(e);
    }
  }, [selectedCurrency]);

  const priceChange = useMemo(() => {
    const change = currentConversion - latestConverstion;
    setLatestConversion(currentConversion);
    const absPriceChange = round(change);
    if (change > 0) {
      return {
        value: absPriceChange,
        arrow: "up",
      };
    } else {
      return {
        value: absPriceChange,
        arrow: "down",
      };
    }
  }, [currentConversion]);

  const handleConversionAmountChange = (e) => {
    const aValue = e.target.value;
    setConversionAmount(aValue);
  };

  const handleCurrencyChange = (e) => {
    const cValue = e.target.value;
    setSelectedCurrency(cValue);
  };

  const debouncedConversionAmount = useDebounce(+conversionAmount, 500);

  const refreshCallback = useCallback(async () => {
    const currency = await fetchCurrency();
    if (!!currency?.value) {
      setCurrentConversion(round(currency?.value * debouncedConversionAmount));
    }
  }, [debouncedConversionAmount, fetchCurrency]);

  useInterval(refreshCallback, 5000);

  // Execute refresh instantly when any of amount or the currency changed
  useEffect(() => {
    refreshCallback();
  }, [debouncedConversionAmount, selectedCurrency]);

  // useEffect(() => {
  //   console.log(priceChange)
  // }, [priceChange])
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div className="input-wrapper">
          <label htmlFor="conversion-amount">Enter amount of</label>
          <input
            id="conversion-amount"
            placeholder="money"
            value={conversionAmount}
            onChange={handleConversionAmountChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="conversion-amount">To convert</label>
          <select className="select-height" onChange={handleCurrencyChange}>
            <option value="">to currency</option>
            {Object.keys(currencyOptions).map((currency) => (
              <option key={currency} value={currency}>{currencyOptions[currency]}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="result-wrapper">
        <h3>{!!currentConversion ? currentConversion : ""}</h3>
        <h2> WUC </h2>
        {priceChange?.value && priceChange?.arrow ? (
          <span className={priceChange?.arrow === "up" ? "up" : "down"}>
            <h3>
              {priceChange?.value ? priceChange?.value : "-"}
              {priceChange?.arrow === "up" ? "⬆" : "⬇"}
            </h3>
          </span>
        ) : null}
      </div>
      {conversionError ? <p>Something went wront</p> : null}
    </div>
  );
};

export default SimpleCryptoConverter