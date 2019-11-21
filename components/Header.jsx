import React, { useState } from 'react';
import '../styles/Header.css';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Header = () => {
  // const [isModalOpen, setModal] = useState(false);

  const [signUpIsOpen, setSignUpIsOpen] = useState(false);
  const [signInIsOpen, setSignInIsOpen] = useState(false);

  const handleSignUp = e => {
    e.preventDefault();
    setSignUpIsOpen(!signUpIsOpen);
    setSignInIsOpen(false);
  };

  const handleSignIn = e => {
    e.preventDefault();
    setSignInIsOpen(!signInIsOpen);
    setSignUpIsOpen(false);
  };

  const redirectModal = e => {
    e.preventDefault();
    setSignUpIsOpen(!signUpIsOpen);
    setSignInIsOpen(!signInIsOpen);
  };

  const closeModal = () => {
    setSignUpIsOpen(false);
    setSignInIsOpen(false);
  };

  return (
    <div className="header">
      <p className="header-title"> Instagram </p>
      {/* <Modal /> */}

      <button
        className="header-button__blue"
        // id="header-button-v"
        type="button"
        onClick={handleSignIn}
      >
        Войти
      </button>
      {/* { isModalOpen && <SignIn/>} */}

      <button
        className="header-button__white"
        // id="header-button-z"
        type="button"
        onClick={handleSignUp}
      >
        Зарегистрироваться
      </button>
      {/* { isModalOpen && <SignUp/>} */}

      {signUpIsOpen && (
        <SignUp redirectModal={redirectModal} closeModal={closeModal} />
      )}
      {signInIsOpen && (
        <SignIn redirectModal={redirectModal} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Header;
