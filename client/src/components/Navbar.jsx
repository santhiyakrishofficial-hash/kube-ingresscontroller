import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar" id="main-nav">
      <NavLink to="/" className="navbar__logo">
        <span className="navbar__logo-icon">🚀</span>
        KidSkills
      </NavLink>
      <div className="navbar__links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
          id="nav-home"
        >
          🏠 Home
        </NavLink>
        <NavLink
          to="/skills"
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
          id="nav-skills"
        >
          🎯 Skills
        </NavLink>
        <NavLink
          to="/activities"
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
          id="nav-activities"
        >
          🎮 Activities
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
          id="nav-leaderboard"
        >
          🏆 Leaderboard
        </NavLink>
        <NavLink
          to="/add-child"
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
          id="nav-add-child"
        >
          ➕ Add Child
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
