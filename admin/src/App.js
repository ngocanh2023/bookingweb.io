import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Admin from "./pages/admin"
import Hotels from "./pages/hotels/addHotels"
import NewProduct from "./pages/newProduct/newProduct"
import AddRooms from "./pages/rooms/addRooms"
import AddNewRooms from "./pages/newRooms/addNewRooms"
import Transactions from "./pages/transactions/transactions";
import EditHotel from "./pages/hotels/editHotel"
import EditRoom from "./pages/newRooms/editRoom"
import Users from "./pages/users/users"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/hotels" element={<Hotels/>}/>
        <Route path="/hotels/newProduct" element={<NewProduct/>} />
        <Route path="/addRooms" element={<AddRooms/>} />
        <Route path="/addRooms/addNewRooms" element={<AddNewRooms/>} />
        <Route path="/transactions" element={<Transactions/>}/>
        <Route path="/hotels/newProduct/:id" element={<EditHotel/>}/>
        <Route path="/addRooms/addNewRooms/:id" element={<EditRoom/>}/>
        <Route path="/users" element={<Users/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
