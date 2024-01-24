import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  Switch,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import OrderScreen from "./screens/OrderScreen";
import StatsScreen from "./screens/StatsScreen";

function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={HomeScreen} />
          <Route path="/cart" exact Component={CartScreen} />
          <Route path="/orders" exact Component={OrderScreen} />
          <Route path="/stats" exact Component={StatsScreen} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
