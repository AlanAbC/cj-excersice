import axios from "axios";
import { coingeko, cryptocompare, currencyConverter, stormgain } from "./urls";

export const getCoingekoData = async (ids) => axios.get(`${coingeko}${ids}`);

export const getStormgainData = async () => axios.get(stormgain);

export const getCryptoCompareData = async (ids) =>
  axios.get(cryptocompare.replace("ids", ids));

export const getCurrentMXNPrice = async () => axios.get(currencyConverter);
