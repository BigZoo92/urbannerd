import React from "react";
import './style.scss'
import AuthForm from "../components/AuthForm";

const Home = () => {
    return (
      <>
        <main className="auth_main">
          <AuthForm></AuthForm>
        </main>
      </>
    );
  };
  
  export default Home;
  