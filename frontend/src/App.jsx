import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { DetailsPage } from "./pages/DetailsPage";
import { AddEvent } from "./pages/AddEvent";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage /> } /> 
      <Route path="/details/:id" element={<DetailsPage />} />
      <Route path="/add" element={<AddEvent />} />
    </Routes>
    </>
  )
}

export default App
