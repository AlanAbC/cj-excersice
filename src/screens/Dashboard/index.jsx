/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InfoValidator from "../../config/InfoValidator";
import Loader from "../../components/Loader";
import Input from "../../components/Input";
import coins from "../../assets/coins";
import {
  getCoingekoData,
  getCryptoCompareData,
  getStormgainData,
} from "../../config/service";
import "./styles.scss";

const Dashboard = () => {
  const personalData = useSelector((state) => state.personalData);
  const [mxn, setMxn] = useState("2000");
  const [activeTab, setActiveTab] = useState("BTC");
  const [convertedPrice, setConvertedPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [coinPrices, setCoinPrices] = useState({
    CG: 0.0,
    CC: 0.0,
    SD: 0.0,
  });
  let coinsIds = coins.map((coin) => coin.key);
  coinsIds = coinsIds.join(",");
  let coinsVals = coins.map((coin) => coin.val);
  coinsVals = coinsVals.join(",");

  const getConvertedData = async (data, coin) => {
    setLoading(true);
    const cgdata = await getCoingekoData(coinsIds)
      .then((res) => {
        const selectedCoin = res.data.filter((e) => e.id === coin[0].key);
        return selectedCoin[0].current_price;
      })
      .catch((e) => console.log(e));

    const ccdata = await getCryptoCompareData(coinsVals)
      .then((res) => res.data[coin[0].val].MXN.toFixed(2))
      .catch((e) => console.log(e));

    const sddata = await getStormgainData()
      .then((res) =>
        (
          res.data[coin[0].stormVal].last_price * personalData.mxnUSDPrice
        ).toFixed(2)
      )
      .catch((e) => console.log(e));

    setCoinPrices({
      CG: cgdata,
      CC: ccdata,
      SD: sddata,
    });
    setLoading(false);
  };

  const getMXNPrice = async (data) => {
    setConvertedPrice((data / personalData.mxnUSDPrice).toFixed(2));
  };

  useEffect(() => {
    getConvertedData(
      mxn,
      coins.filter((coin) => activeTab === coin.val)
    );
    getMXNPrice(mxn);
  }, []);

  const handleChangeMXN = async (value) => {
    setMxn(value);
    getMXNPrice(value);
    getConvertedData(
      value,
      coins.filter((coin) => activeTab === coin.val)
    );
  };

  const numberWithCommas = (x) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="container-dashboard">
      <div className="header">
        <h2>Welcome {personalData.name}</h2>
      </div>
      <div className="body">
        <div className="tabscontainer">
          {coins.map((coin) => (
            <div
              role="button"
              tabIndex={0}
              className={`tab ${coin.val === activeTab ? "active" : ""}`}
              onClick={() => {
                setActiveTab(coin.val);
                getConvertedData(
                  mxn,
                  coins.filter((c) => coin.val === c.val)
                );
              }}
            >
              <img src={coin.image} alt={coin.key} />
              <p>{coin.name}</p>
            </div>
          ))}
        </div>
        <div className="data-container">
          <div className="input-content">
            <p className="sign">$</p>
            <Input
              value={mxn}
              onChange={(e) => handleChangeMXN(e.target.value)}
              label="Enter the MXN quantity to convert:"
              placeholder="100.50"
            />
            <p className="converted">{`=  $${numberWithCommas(
              convertedPrice
            )} USD`}</p>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="info">
              <div className="info-item">
                <div className="info-header one">Coingeko</div>
                <p className="price">{`$${(mxn / coinPrices.CG).toFixed(
                  4
                )} ${activeTab}`}</p>
              </div>
              <div className="info-item">
                <div className="info-header two">Stormgain</div>
                <p className="price">{`$${(mxn / coinPrices.SD).toFixed(
                  4
                )} ${activeTab}`}</p>
              </div>
              <div className="info-item">
                <div className="info-header three">CryptoCompare</div>
                <p className="price">{`$${(mxn / coinPrices.CC).toFixed(
                  4
                )} ${activeTab}`}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoValidator(Dashboard);
