import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';

const PopularCocktails = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const cocktailsArray = [];
        for (let i = 0; i < 6; i++) {
          const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
          const data = await response.json();
          if (data.drinks && data.drinks.length > 0) {
            cocktailsArray.push(data.drinks[0]);
          }
        }
        setCocktails(cocktailsArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchCocktails();
  }, []);

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

export default PopularCocktails;
