
import React, { useState } from 'react';

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="판매중인 굿즈를 검색해보세요!"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="submit">검색</button>
    </form>
  );
}

export default Search;
