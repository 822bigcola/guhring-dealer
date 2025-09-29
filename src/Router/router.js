import Loginpage from "../Pages/Login/login";
import HomePage from "../Pages/Home/home";
import LogoutPage from "../Pages/Logout/logout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SearchArticle from "../Pages/Search Article/searchArticle";
import NavbarGuhring from "../service/Navbar/navbar";
import FooterGuhring from "../service/Footer/footer";
import "./router.css";
import LoadingPage from "../service/Loading/loading";

class RouterPages extends React.Component {
  state = { username: "", isloading: false };
  handleUsernameChange = (newUsername) => {
    this.setState({ username: newUsername });
  };
  handleIsLoadingChange = (newIsLoading) => {
    this.setState({ isloading: newIsLoading });
  };
  render() {
    try {
      return (
        <BrowserRouter>
          {this.state.isloading ? (
            <LoadingPage />
          ) : (
            <div className="app-container">
              <NavbarGuhring usnername={this.state.username} />
              <div className="main-content">
                <Routes>
                  {/* Trang login */}
                  <Route
                    path="/login"
                    element={
                      <Loginpage
                        updateUsername={this.handleUsernameChange}
                        isloading={this.handleIsLoadingChange}
                      />
                    }
                  />
                  <Route path="/search-article" element={<SearchArticle />} />
                  <Route
                    path="/logout"
                    element={
                      <LogoutPage updateUsername={this.handleUsernameChange} />
                    }
                  />
                  {/* Trang chủ (ví dụ) */}
                  <Route exact path="/" element={<HomePage />} />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </div>
              <FooterGuhring />
            </div>
          )}
        </BrowserRouter>
      );
    } catch (error) {
      return (
        <>
          <LoadingPage />
        </>
      );
    }
  }
}

export default RouterPages;
