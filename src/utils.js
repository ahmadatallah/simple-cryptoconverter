import { useState, useEffect, useRef } from "react";

const useDebounce = (value, interval) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    function debounce() {
      const timeout = setTimeout(() => {
        setDebouncedValue(value);
      }, interval);
      return () => clearTimeout(timeout);
    },
    [value, interval]
  );
  return debouncedValue;
};

const useInterval = (callback, interval) => {
  const intervalId = useRef(null);

  useEffect(() => {
    if (!!intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    intervalId.current = setInterval(callback, interval);
    return () => {
      clearInterval(intervalId);
    };
  }, [interval, callback]);

  return intervalId.current;
};

const round = (value) => Math.abs(Math.round(value * 100) / 100);

const currencyOptions = {
  usd: "USD",
  eur: "EUR",
  gbp: "GBP",
  cny: "CNY",
  jpy: "JPY",
};

const BASE_URL = "https://api.frontendeval.com/fake/crypto";

export { useDebounce, useInterval, round, currencyOptions, BASE_URL };
