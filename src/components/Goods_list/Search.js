import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import "../../styles/Home.css";

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button id="Search">
          <BiSearch size="20" />
        </button>
        <input
          id="SearchBar"
          placeholder="판매중인 굿즈를 검색해보세요!"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

export default Search;
