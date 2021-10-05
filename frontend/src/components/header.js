import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="navegador">
      <NavLink exact to="/bathroom">Bathroom</NavLink>
      <NavLink exact to="/kitchen">Kitchen</NavLink>
      <NavLink exact to="/">Home</NavLink>
      <NavLink exact to="/signup">Sign up</NavLink>
      <NavLink exact to="/signin">Sign In</NavLink>
      <NavLink exact to="/">Log out</NavLink>
    </header>
  )
}

export default Header;
