import React, { useState } from "react";
import "./assets/css/App.css";
import bgMobile from "./assets/img/bg-main-mobile.png";
import bgDesktop from "./assets/img/bg-main-desktop.png";
import cardLogo from "./assets/img/card-logo.svg";
import confirm from "./assets/img/icon-complete.svg";
import {format} from "date-fns"

function App() {
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("00");
  const [cvc, setCvc] = useState("0123");

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
                  {format(new Date(date), "MM/yy")}
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
              <form className="flex flex-col justify-center gap-8 max-w-lg lg:h-screen">
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
                  />
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
                    value={cardNumber
                      .replace(/\s/g, "")
                      .replace(/(\d{4})/g, "$1 ")
                      .trim()}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
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
                    />
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
                    />
                  </div>
                </article>
                <button
                  type="submit"
                  onClick={() => setConfirmed(true)}
                  className="btn"
                >
                  Confirm
                </button>
              </form>
            )}
            {confirmed && <ThankYou setConfirmed={setConfirmed()} />}
          </div>
        </div>
      </section>
    </>
  );
}
function ThankYou(props) {
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
          onClick={() => props.setConfirmed(false)}
        >
          Continue
        </button>
      </div>
    </>
  );
}
export default App;
