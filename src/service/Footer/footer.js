import React from "react";

class FooterGuhring extends React.Component {
  render() {
    return (
      <footer className="bg-dark text-light py-4 mt-auto shadow-lg">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="mb-2 mb-md-0">
            <span>&copy; {new Date().getFullYear()} Guhring Vietnam</span>
          </div>
          <div>
            <a
              href="https://guhring.com"
              className="text-light me-3 text-decoration-none"
            >
              Website
            </a>
            <a
              href="mailto:phan-trong.hieu@guhring.vn"
              className="text-light text-decoration-none"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default FooterGuhring;
