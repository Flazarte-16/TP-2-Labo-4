import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import './CocktailDetails.css';

const CocktailDetails = () => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setCocktail(data.drinks[0]);
      } catch (error) {
        console.error('Error fetching cocktail details:', error);
      }
    };
    fetchCocktailDetails();
  }, [id]);

  return (
    <div className="cocktail-details-container">
      {cocktail ? (
        <div>
          <h2>{cocktail.strDrink}</h2>
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-details-image" />
          <p>{cocktail.strInstructions}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CocktailDetails;
