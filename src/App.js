import React, { useState, useEffect } from "react";
import "./assets/css/App.css";
import bgMobile from "./assets/img/bg-main-mobile.png";
import bgDesktop from "./assets/img/bg-main-desktop.png";
import cardLogo from "./assets/img/card-logo.svg";
import confirm from "./assets/img/icon-complete.svg";

function App() {
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [nameInfoVisible, setNameInfoVisible] = useState(false);
  const [cardNumberInfoVisible, setCardNumberInfoVisible] = useState(false);
  const [dateInfoVisible, setDateInfoVisible] = useState(false);
  const [cvcInfoVisible, setCvcInfoVisible] = useState(false);

  const handleFocus = (inputName) => {
    switch (inputName) {
      case "name":
        setNameInfoVisible(false);
        break;
      case "cardNumber":
        setCardNumberInfoVisible(false);
        break;
      case "date":
        setDateInfoVisible(false);
        break;
      case "cvc":
        setCvcInfoVisible(false);
        break;
      default:
        break;
    }
  };

  const handleBlur = (inputName) => {
    switch (inputName) {
      case "name":
        setNameInfoVisible(name === "");
        break;
      case "cardNumber":
        setCardNumberInfoVisible(cardNumber === "");
        break;
      case "date":
        setDateInfoVisible(date === "");
        break;
      case "cvc":
        setCvcInfoVisible(cvc === "");
        break;
      default:
        break;
    }
  };

  const handleContinue = () => {
    setName("");
    setCardNumber("");
    setDate("00");
    setCvc("0123");
    setConfirmed(false);
  };

  function handleCardNumberChange(e) {
    setCardNumber(
      e.target.value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
    );
  }

  const confirmCardDetails = (event) => {
    event.preventDefault(); // Bu satırı ekleyin

    if (name === "" || cardNumber === "" || date === "" || cvc === "") {
      setNameInfoVisible(true);
      setCardNumberInfoVisible(true);
      setDateInfoVisible(true);
      setCvcInfoVisible(true);
    } else {
      setConfirmed(true);
    }
  };

  return (
    <>
      <section>
        <div className="absolute -z-10 w-full">
          <picture>
            <source media="(min-width: 768px)" srcSet={bgDesktop} />
            <img src={bgMobile} alt="" className="w-full md:w-1/3" />
          </picture>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl m-auto">
          <div className="mt-10 mx-5 lg:grid lg:grid-cols-1">
            <article className="front-card p-5 flex flex-col justify-between">
              <img className="w-20 lg:w-28" src={cardLogo} alt="" />
              <div>
                <h2 className="text-white text-lg lg:text-2xl mb-6 tracking-widest">
                  {cardNumber}
                </h2>
                <ul className="flex items-center justify-between">
                  <li className="text-white uppercase text-base lg:text-xl tracking-widest">
                    {name}
                  </li>
                  <li className="text-white uppercase text-base lg:text-xl tracking-widest">
                    {date}
                  </li>
                </ul>
              </div>
            </article>
            <article className="back-card relative lg:ml-20">
              <p className="absolute right-10 text-lg lg:text-xl text-white tracking-widest">
                {cvc}
              </p>
            </article>
          </div>
          <div className="pt-8 px-5 pb-20">
            {!confirmed && (
              <form
                className="flex flex-col justify-center gap-8 max-w-lg lg:h-screen"
                onSubmit={(event) => {
                  event.preventDefault();
                  confirmCardDetails();
                }}
              >
                <div>
                  <label className="card-holder">Cardhloder Name</label>
                  <input
                    type="text"
                    name="card-holder"
                    id="card-holder"
                    placeholder="e.g John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => handleFocus("name")}
                    onBlur={() => handleBlur("name")}
                  />
                  <p
                    className={`info ${nameInfoVisible ? "" : "info--visible"}`}
                    aria-live="polite"
                  >
                    Can't be blank
                  </p>
                </div>
                <div>
                  <label className="card-number">Card Number</label>
                  <input
                    type="text"
                    name="card-number"
                    id="card-number"
                    placeholder="e.g 0000 0000 0000 0000"
                    maxLength={19}
                    required
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    onFocus={() => handleFocus("cardNumber")}
                    onBlur={() => handleBlur("cardNumber")}
                  />
                  <p
                    className={`info ${
                      cardNumberInfoVisible ? "" : "info--visible"
                    }`}
                    aria-live="polite"
                  >
                    Can't be blank
                  </p>
                </div>

                <article className="flex items-center justify-between gap-8">
                  <div className="flex-1">
                    <label className="expiry-date">Exp. Date (MM/YY)</label>
                    <input
                      type="month"
                      name="expiry-date"
                      id="expiry-date"
                      placeholder="MM YY"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      onFocus={() => handleFocus("date")}
                      onBlur={() => handleBlur("date")}
                    />
                    <p
                      className={`info ${
                        dateInfoVisible ? "" : "info--visible"
                      }`}
                      aria-live="polite"
                    >
                      Can't be blank
                    </p>
                  </div>

                  <div className="flex-1">
                    <label className="card-cvc">CVC</label>
                    <input
                      type="text"
                      name="card-cvc"
                      id="card-cvc"
                      placeholder="e.g 111"
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      onFocus={() => handleFocus("cvc")}
                      onBlur={() => handleBlur("cvc")}
                    />
                    <p
                      className={`info ${
                        cvcInfoVisible ? "" : "info--visible"
                      }`}
                      aria-live="polite"
                    >
                      Can't be blank
                    </p>
                  </div>
                </article>
                <button
                  type="submit"
                  onClick={() => {
                    if (
                      name === "" ||
                      cardNumber === "" ||
                      date === "" ||
                      cvc === ""
                    ) {
                      document.querySelectorAll(".info").forEach((el) => {
                        el.classList.add("info--visible");
                      });
                    } else {
                      setConfirmed(true);
                    }
                  }}
                  className="btn"
                >
                  Confirm
                </button>
              </form>
            )}
            {confirmed && <ThankYou handleContinue={handleContinue} />}
          </div>
        </div>
      </section>
    </>
  );
}
function ThankYou(props) {
  useEffect(() => {
    if (props.confirmed) {
      props.setConfirmed(false);
    }
  }, [props.confirmed, props.setConfirmed]);
  return (
    <>
      <div className="thank-you flex flex-col items-center justify-center lg:h-screen text-center max-w-lg mx-auto">
        <img src={confirm} alt="" className="block mx-auto" />
        <h1 className="text-slate-800 text-3xl mb-6 my-6 uppercase">
          Thank You !
        </h1>
        <p className="text-slate-400">We've added your card details</p>
        <button
          className="btn block mx-auto mt-10"
          onClick={props.handleContinue}
        >
          Continue
        </button>
      </div>
    </>
  );
}
export default App;
