import React, { useState } from 'react';
import '../styles/Modal.css';
import Axios from 'axios';

const SignIn = ({ redirectModal, closeModal }) => {
  const userLogin = {
    login: '',
    password: ''
  };
  const [login, setLogin] = useState(userLogin.login);
  const autho = e => {
    e.preventDefault();
    Axios.post('/login', { param: userLogin }).then(res => {
      res.data
        ? ((localStorage.user = userLogin.login), alert('you are logged'))
        : alert('user not found');
    });
    // localStorage.setItem('user', userLogin.login);
    // console.log(localStorage.setItem('user', userLogin.login));
    console.log(localStorage.getItem('user'));
    closeModal();
  };
  console.log(userLogin);

  const handleUser = e => {
    const { name, value } = e.target;
    userLogin[name] = value;
    // console.log(user);
  };

  return (
    <div className="background">
      <div className="signin">
        <div className="modal-nav">
          <div className="modal-nav-close" onClick={closeModal}>
            Закрыть
          </div>
          <span>Нет аккаунта?</span>
          <button onClick={redirectModal}>Зарегистрируйтесь</button>
        </div>

        <form className="modal-form">
          <h1 className="modal-title">Вход</h1>
          <input
            name="login"
            type="text"
            placeholder="Имя пользователь"
            onChange={handleUser}
          ></input>
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            onChange={handleUser}
          ></input>
          <button className="modal-button__blue" onClick={autho}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
