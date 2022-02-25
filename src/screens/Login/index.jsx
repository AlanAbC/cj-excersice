import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Hello from "../../assets/hello.svg";
import { setUserData, setMxnUSDPrice } from "../../reducers/personalData";
import { getCurrentMXNPrice } from "../../config/service";
import "./styles.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const clearForm = () => {
    setName("");
    setLastName("");
    setEmail("");
    setPhone("");
  };

  const saveData = () => {
    dispatch(setUserData({ name, last_name: lastName, email, phone }));
    clearForm();
    navigate("/dashboard");
  };

  const checkDisabled = () => {
    let flag = true;
    if (name !== "" && lastName !== "" && email !== "" && phone !== "") {
      flag = false;
    }
    return flag;
  };

  const getUSDMXNPrice = async () => {
    await getCurrentMXNPrice()
      .then((res) => {
        dispatch(setMxnUSDPrice({ mxnUSDPrice: res.data.rates.MXN }));
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getUSDMXNPrice();
  }, []);

  return (
    <div className="container">
      <div className="left-container">
        <div className="top-container">
          <h1>Crypto Compare Tracker</h1>
          <p className="subtitle">
            <strong>Hi!</strong>
            <br />
            Before we begin please share us this information:
          </p>
        </div>
        <div className="form">
          <div className="inline-inputs">
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              label="Full Name"
              sublabel="Name"
              placeholder="Jose"
            />
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sublabel="Last Name"
              placeholder="Dominguez"
            />
          </div>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="jose@test.com"
          />
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            label="Phone"
            placeholder="99999999"
          />
          <Button
            onClick={() => saveData()}
            disabled={checkDisabled()}
            type="button"
          >
            Log in
          </Button>
        </div>
      </div>
      <div className="right-container">
        <img src={Hello} alt="hello" />
      </div>
    </div>
  );
};

export default Login;
