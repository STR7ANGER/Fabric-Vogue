import React from "react";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
      <div>
        <NavLink to="/add"></NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
