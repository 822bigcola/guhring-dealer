import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

class NavbarGuhring extends React.Component {
  handleNavClick = () => {
    const navbar = document.querySelector(".navbar-collapse");
    if (navbar?.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  render() {
    const username = this.props.username || sessionStorage.getItem("username");

    return (
      <div className="container-fluid fixed-top bg-white shadow-sm">
        <nav className="navbar navbar-expand-lg navbar-light">
          <NavLink to="/" className="navbar-brand">
            <img
              src="https://webshop.guehring.de/media/logo/websites/1/2000px-G_hring_Logo.svg.png"
              alt="Guhring"
              style={{ height: "50px", width: "200px", objectFit: "contain" }}
            />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-3">
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  id="functionDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: "none", border: "none" }}
                >
                  ⚙️ Function
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="functionDropdown"
                >
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/search-article"
                      onClick={this.handleNavClick}
                    >
                      🔍 Search Article
                    </NavLink>
                  </li>
                  {/*thêm nhiều mục khác tại đây */}
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {username ? (
                <>
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle"
                      id="accountDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ background: "none", border: "none" }}
                    >
                      👤 Account
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="accountDropdown"
                    >
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/logout"
                          onClick={this.handleNavClick}
                        >
                          🔓 Logout
                        </NavLink>
                      </li>

                      {/*thêm nhiều mục khác tại đây */}
                    </ul>
                  </li>
                  <span className="nav-link">{username}</span>
                </>
              ) : (
                <li className="nav-item d-flex align-items-center">
                  <NavLink
                    className="nav-link d-flex align-items-center"
                    to="/login"
                    onClick={this.handleNavClick}
                    title="Login"
                  >
                    🔐 Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavbarGuhring;
