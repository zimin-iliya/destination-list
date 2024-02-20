import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import { UserContextProvider } from "./states/UserContext";
import Outh from "./pages/Outh";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import MapView from "./components/map/MapView";


function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Outh />} />
          <Route path="/search" element={<Search />} />
          {/* <Route path="/map" element={<MapView />} /> */}
          {/* <Route index element={<Content />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Create />} />
        */}
          <Route path="/outh" element={<Outh />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
