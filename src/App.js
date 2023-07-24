import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPage from "./pages/MyPage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Button from "./components/Button";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
