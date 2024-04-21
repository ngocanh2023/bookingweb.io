import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Register from "./components/navbar/register/register"
import Login from "./components/navbar/login/login"
import Reserve from "./pages/reserve/reserve"
import Transactions from "./pages/transactions/transactions"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/reserve/:id" element={<Reserve/>} />
        <Route path="/transactions" element={<Transactions/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
