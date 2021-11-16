import "./App.css";
import { Routes, Route, useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import KeyMap from "./KeyMap";

function App() {
  return (
    <Routes>
      <Route exact path="/reserve" element={<ReservationForm/>}/>
      <Route path="/keymap" element={<KeyMap/>}/>
    </Routes>
  );
}

export default App;
