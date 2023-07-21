import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPage from "./pages/MyPage";
import Market from "./pages/Market";
import Register from "./pages/Register";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/wowmarket" element={<Market />} />
          <Route path="/users" element={<Users />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
