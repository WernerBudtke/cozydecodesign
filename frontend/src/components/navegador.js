import React, { useState } from "react";
import { NavLink } from "react-router-dom";


const Navegador = (props) => {

  return (
    <div className="navegador">
      <NavLink
        exact
        to="/bathroom"
      >
        Bathroom
      </NavLink>

      <NavLink
        exact
        to="/kitchen"
      >
        Kitchen
      </NavLink>

      <NavLink
        exact
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        exact
        to="/signup"
      >
        Sign up
      </NavLink>

      <NavLink
        exact
        to="/login"
      >
        Log in
      </NavLink>

      <NavLink
        onClick={() => props.logOut()}
        exact
        to="/"
      >
        Log out
      </NavLink>
    </div>
  );
};

export default Navegador;
