import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import NavbarComp from "./components/navbarComp/NavbarComp";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <NavbarComp />

      <Dashboard />
    </>
  );
}

export default App;
