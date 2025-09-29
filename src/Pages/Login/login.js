import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./login.css";
import withRouter from "../../HOC/withRouter";

class Loginpage extends React.Component {
  state = {
    user: { username: "", password: "" },
    showPassword: false,
  };

  handleButtonSubmit = async (event) => {
    event.preventDefault();
    this.props.isloading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL_API_LOCAL}/login`,
        this.state.user
      );
      this.props.updateUsername(this.state.user.username);
      toast.success("🎉 Login successfully");
      console.log(res.data);

      sessionStorage.setItem("username", this.state.user.username);
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("role", res.data.role);
      this.props.router.navigate(-1);
    } catch (error) {
      const message =
        error.response?.data?.message || "❌ Wrong username or password";
      toast.warning(message);
    }
    this.props.isloading(false);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const filteredValue =
      name === "username" ? value.replace(/[^a-zA-Z0-9]/g, "") : value;
    this.setState({
      user: { ...this.state.user, [name]: filteredValue },
    });
  };

  togglePassword = () => {
    this.setState((prev) => ({ showPassword: !prev.showPassword }));
  };

  render() {
    const { showPassword } = this.state;

    return (
      <div className="login-container">
        <div className="login-card">
          <h3 className="login-title">🟡 Guhring Login</h3>
          <form onSubmit={this.handleButtonSubmit}>
            <div className="mb-3">
              <label className="form-label">👤 Username</label>
              <input
                type="text"
                className="form-control login-input"
                name="username"
                placeholder="Enter your username"
                value={this.state.user.username}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">🔑 Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control login-input rounded-start"
                  placeholder="Enter your password"
                  value={this.state.user.password}
                  onChange={this.handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn toggle-password-btn"
                  onClick={this.togglePassword}
                  tabIndex={-1}
                  style={{ marginLeft: "10px" }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="d-grid mt-4">
              <button type="submit" className="btn login-button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Loginpage);
