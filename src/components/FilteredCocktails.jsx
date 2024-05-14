import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';

const FilteredCocktails = ({ filter }) => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${filter}`;
        const response = await fetch(url);
        const data = await response.json();
        setCocktails(data.drinks || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <div className="cocktail-list">
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        cocktails.map(cocktail => (
          <div key={cocktail.idDrink} className="cocktail-item">
            <h3>{cocktail.strDrink}</h3>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-image" />
            <Link href={`/cocktail/${cocktail.idDrink}`}>
              <button className='custom-button'>View More</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default FilteredCocktails;
