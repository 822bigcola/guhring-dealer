import "./App.css";
import RouterPages from "./Router/router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <RouterPages />
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
}

export default App;
