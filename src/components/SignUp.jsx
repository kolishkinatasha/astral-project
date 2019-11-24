import React from 'react';
// import { Form, Field } from 'react-final-form'
import '../styles/Modal.css';
import Axios from 'axios';

const SignUp = ({ redirectModal, closeModal }) => {
  const user = {
    name: '',
    login: '',
    email: '',
    password: ''
  };

  const handleUser = e => {
    const { name, value } = e.target;
    user[name] = value;
    console.log(user);
  };

  const createUser = e => {
    e.preventDefault();
    Axios.post('/signup', { param: user }).then(res => {
      // user = res.data;
      console.log(res.data);
      closeModal();
    });
  };

  return (
    <div className="background">
      <div className="signup">
        <div className="modal-nav">
          <div onClick={closeModal}>Закрыть</div>
          <span>Уже зарегистрированы?</span>
          <button onClick={redirectModal}>Войдите</button>
        </div>

        <form className="modal-form">
          <h1 className="modal-title">Регистрация</h1>
          <input
            name="name"
            type="text"
            placeholder="Полное имя"
            onChange={handleUser}
          ></input>
          <input
            name="login"
            type="text"
            placeholder="Имя пользователь"
            onChange={handleUser}
          ></input>
          <input
            name="email"
            type="text"
            placeholder="Email"
            onChange={handleUser}
          ></input>
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            onChange={handleUser}
          ></input>
          <button className="modal-button__blue" onClick={createUser}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
