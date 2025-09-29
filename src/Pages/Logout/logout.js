import React from "react";
import withRouter from "../../HOC/withRouter";
import { toast } from "react-toastify";

class LogoutPage extends React.Component {
  state = { redirectToHome: false };
  componentDidMount() {
    this.logoutInit();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.redirectToHome && !prevState.redirectToHome) {
      toast.success("Logout successfully");
      this.props.router.navigate("/");
    }
  }

  logoutInit = () => {
    sessionStorage.setItem("username", "");
    sessionStorage.setItem("token", "");
    this.props.updateUsername("");
    this.setState({ redirectToHome: true });
  };
  render() {
    return <div></div>;
  }
}

export default withRouter(LogoutPage);
