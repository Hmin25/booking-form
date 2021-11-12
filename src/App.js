import "./App.css";
import { Routes, Route, useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";

function App() {
  return (
    <Routes>
      <Route exact path="/reserve" element={<ReservationForm/>}/>
    </Routes>
  );
}

export default App;
