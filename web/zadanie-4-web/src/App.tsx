import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./router/Routes/index";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <RoutesComponent></RoutesComponent>
    </BrowserRouter>
  );
}

export default App;
