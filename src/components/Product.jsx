import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import './Product.css';

const Cocktails = () => {
  const [cocktails, setCocktails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async (searchTerm) => {
      try {
        let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        if (searchTerm) {
          url += searchTerm;
        } else {
          url += ' ';
        }
        const response = await fetch(url);
        const data = await response.json();
        let drinks = data.drinks || [];
        if (!searchTerm) {
          drinks = drinks.slice(0, 6);
        }
        return drinks;
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    };

    const fetchMultipleCocktails = async (searchTerm) => {
      const cocktailData = await fetchData(searchTerm);
      setCocktails(cocktailData ? cocktailData.filter(cocktail => cocktail !== null) : []);
    };

    fetchMultipleCocktails(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="cocktail-container">
      <input 
        type="text" 
        placeholder="Search Drinks..." 
        value={searchTerm} 
        onChange={handleSearchChange} 
      />
      <div>
        <h2 className="title">Featured Products</h2>
        <div className="cocktail-list">
          {cocktails.map(cocktail => (
            <div key={cocktail.idDrink} className="cocktail-item">
              <h3>{cocktail.strDrink}</h3>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-image" />
              <Link href={`/cocktail/${cocktail.idDrink}`}>
                <button className='custom-button'>View More</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cocktails;
