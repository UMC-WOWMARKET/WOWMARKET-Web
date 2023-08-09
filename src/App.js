import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MyPage from "./pages/MyPage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Goods from "./pages/Goods";
import Button from "./components/Button";
import Search from "./pages/Search";
import Introduce from "./pages/Introduce";

function App() {
  const handleSearch = (searchTerm) => {
    // 여기서 검색어를 이용하여 검색 기능을 구현하거나 다른 원하는 작업을 수행합니다.
    console.log('검색어:', searchTerm);
  };
  return (
    <BrowserRouter>
    <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detail/:goods_id" element={<Goods />} />
          <Route path="/mypage/:user_id" element={<MyPage />} />
        </Routes>
      </div>
      <Introduce/>
    </BrowserRouter>
    
  );
}

export default App;

