import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../changePassword/changePassword.css";
import withRouter from "../../HOC/withRouter";

class ChangePassword extends React.Component {
  state = { oldPassword: "", newPassword: "" };

  handleChangePassword = async (event) => {
    event.preventDefault();
    this.props.isloading(true);
    const { oldPassword, newPassword } = this.state;

    if (!oldPassword || !newPassword) {
      toast.warning("⚠️ Please enter both current and new password");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_URL_API_LOCAL}/changepassword`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("✅ Password changed successfully");
      this.setState({ oldPassword: "", newPassword: "" });
    } catch (error) {
      toast.error("❌ Failed to change password");
      console.error(error.response?.data || error.message);
    }
    this.props.isloading(false);
    this.props.router.navigate("/");
  };

  render() {
    return (
      <div className="change-password-wrapper">
        <div className="change-password-card">
          <h3 className="change-password-title">🔐 Change Password</h3>

          <form onSubmit={this.handleChangePassword}>
            <div className="mb-4">
              <label className="form-label change-password-label">
                Current Password
              </label>
              <input
                type="password"
                value={this.state.oldPassword}
                onChange={(e) => this.setState({ oldPassword: e.target.value })}
                className="form-control change-password-input"
                placeholder="Enter current password"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label change-password-label">
                New Password
              </label>
              <input
                type="password"
                value={this.state.newPassword}
                onChange={(e) => this.setState({ newPassword: e.target.value })}
                className="form-control change-password-input"
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="d-grid mt-4">
              <button type="submit" className="btn change-password-button">
                ✅ Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(ChangePassword);
