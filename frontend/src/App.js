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
import GenerateQR from "./pages/generateQR/generateQR"
// import GenQR from "./pages/generateQR/genQR"
import HomeLogin from "./pages/home/homeLogin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:email" element={<HomeLogin/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/reserve/:id" element={<Reserve/>} />
        <Route path="/transactions/:email" element={<Transactions/>}/>
        <Route path="/generateQR" element={<GenerateQR/>}/>
        {/* <Route path="/genQR" element={<GenQR/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
