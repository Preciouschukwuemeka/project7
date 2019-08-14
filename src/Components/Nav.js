import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
      <div>
       <nav className="main-nav">
        <ul>
          <li><NavLink to={"/statues"}>Statues</NavLink></li>
          <li><NavLink to={"/animals"}>Animals</NavLink></li>
          <li><NavLink to={"/watches"}>Watches</NavLink></li>
        </ul>
      </nav>

     </div>
    );
}

export default Nav;