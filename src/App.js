import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MyPage from "./pages/MyPage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Goods from "./pages/Goods";
import Introduce from "./pages/Introduce";
import Goodslist from "./pages/Goodslist";
import TextDisplay from "./pages/TextDisplay";
import Search from "./pages/Search";

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
      <div className="Search">
      <Search onSearch={handleSearch} />
    </div>
      <Introduce/>
    <div className="Goodslist">
      <h3>이미지 표시 </h3>
      <Goodslist />
    </div>
    <div className="TextDisplay">
      <h1>굿즈이름</h1>
      <TextDisplay />
    </div>
    </BrowserRouter>
    
  );
}

export default App;

