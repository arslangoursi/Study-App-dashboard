"use client";

import { FormEvent, useState } from "react";

export default function Login() {
  const [phone, setPhone] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Phone number submitted:", phone);
  };

  return (
    <div className="login__container">
      <div className="login__container__sidebar">
        <div className="login__container__sidebar__logo">
          <img
            loading="lazy"
            src="/logo.webp"
            alt="logo"
            className="dashboard__logo"
            width={100}
            height={40}
          />
        </div>
        <div className="login__container__sidebar__content">
          <div className="login__text">Hi, Welcome back</div>
          <div className="login__img">
            <img
              loading="lazy"
              src="/login.png"
              alt="login image"
              style={{
                width: "100%",
                height: "100%"
              }}
            />
          </div>
        </div>
      </div>
      <div className="login__get__start__text">
        <div className="login__container__sidebar__logo__mobile">
          <img
            loading="lazy"
            src="/logo.webp"
            alt="logo"
            className="dashboard__logo"
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="login__form">
        <div className="login__form__warper">
          <div className="login__form__title">Sign in</div>
          <div className="login__form__subtitle">
            Hi, Please login to continue
          </div>
          <div className="login__form__input">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoFocus
            />
          </div>
          <button type="submit" className="login__button">
            Login
          </button>
          <div className="forgot__password">
            <a href="/register" className="forgot__password__btn">
              Don't have an account?
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
