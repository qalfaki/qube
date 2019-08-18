import {useState,useReducer} from "react";

const useCredintialsValidation = () => {
  const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const emailReducer = (state, action) => {
    state = action;
    setEmailValid(validateEmail(state));
    return action;
  };

  const passwordReducer = (state, action) =>{
    state = action;
    if (state.length >= 6) {
      setPasswordValid(true);
    }
    return action;
  }
  const [email, setEmail] = useReducer(emailReducer, "");
  const [password, setPassword] = useReducer(passwordReducer, "");

  return { password, setPassword, passwordValid, email, setEmail, emailValid };

};

export default useCredintialsValidation;