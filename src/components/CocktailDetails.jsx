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
    <section className="cocktail-details-container">
      {cocktail ? (
        <div>
          <h2>{cocktail.strDrink}</h2>
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-details-image" />
          <h3>Instructions</h3>
          <p>{cocktail.strInstructions}</p>
          <h3>Ingredients:</h3>
          <ul>
            {Array.from({ length: 15 }, (_, i) => i + 1).map((index) => {
              const ingredient = cocktail[`strIngredient${index}`];
              const measure = cocktail[`strMeasure${index}`];
              if (ingredient) {
                return (
                  <li key={index}>
                    {measure ? `${measure} - ` : ''}
                    {ingredient}
                  </li>
                );
              }
              return null;
            })}
          </ul>
          <Link to='/' className='custom-button'>
            <span>Go Back</span>
          </Link>
        </div>
      ) : (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}
    </section>
  );
};

export default CocktailDetails;
