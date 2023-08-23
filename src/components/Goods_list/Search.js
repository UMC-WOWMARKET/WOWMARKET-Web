import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import "../../styles/Home.css";

function Search({ searchTerm, setSearchTerm }) {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <button id="Search">
        <BiSearch size="20" />
      </button>
      <input
        id="SearchBar"
        placeholder="판매중인 굿즈를 검색해보세요!"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default Search;
