import React from "react";
import { NavLink } from "react-router-dom";
import useSession from "../../hooks/useSession";

const Sidebar = ({ setIsActive, isActive }) => {
  const { user } = useSession();

  if (user === null) {
    return <></>;
  }

  return (
    <aside className={`sidebar bg-dark ${isActive ? `active` : ``} `}>
      <div className="d-flex justify-content-end"></div>
      <nav className="menu">
        {user.fk_rol === 1 ? (
          <>
            <NavLink
              onClick={() => setIsActive(!isActive)}
              to="/users"
              className="menu-item"
            >
              Users <i className="fas fa-users"></i>
            </NavLink>
            <NavLink
              onClick={() => setIsActive(!isActive)}
              to="/labs"
              className="menu-item"
            >
              Labs <i className="fas fa-building"></i>
            </NavLink>
            <NavLink
              onClick={() => setIsActive(!isActive)}
              to="/computers"
              className="menu-item"
            >
              Computers <i className="fas fa-desktop"></i>
            </NavLink>
            <NavLink
              onClick={() => setIsActive(!isActive)}
              to="/maintenances"
              className="menu-item"
            >
              Maintenances <i className="fas fa-brush"></i>
            </NavLink>
            <NavLink
              onClick={() => setIsActive(!isActive)}
              to="/tickets"
              className="menu-item"
            >
              Tickets <i className="fas fa-ticket-alt"></i>
            </NavLink>
          </>
        ) : null}
        {user.fk_rol === 2 ? (
          <>
            <NavLink
              onClick={() => setIsActive(!isActive)}
              to="/user/tickets"
              className="menu-item"
            >
              Tickets <i className="fas fa-ticket-alt"></i>
            </NavLink>
          </>
        ) : null}
      </nav>
    </aside>
  );
};

export default Sidebar;
