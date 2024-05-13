import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import './Product.css';

const Cocktails = () => {
  const [cocktails, setCocktails] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filter, setFilter] = useState('Popular');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = '';
        if (filter === 'Popular') {
          url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
        } else if (filter !== 'All') {
          url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${filter}`;
        } else {
          url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';
        }
        const response = await fetch(url);
        const data = await response.json();
        let drinks = data.drinks || [];
        setCocktails(drinks.filter(cocktail => cocktail !== null));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filter]); 

  const handleFilterClick = (filter) => {
    setFilter(filter);
    setShowFilterOptions(false);
  };

  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  return (
    <section className="cocktail-container">
      <nav className='navbar'>
        <h2 className='logo'>Liquor Luxe</h2>
        <div className="filter">
          <div className="filter-dropdown" onClick={toggleFilterOptions}>
            <h2 className='logo'>Filter</h2>
            <i className={`fas fa-caret-${showFilterOptions ? 'up' : 'down'}`}></i>
          </div>
          <div className={`filter-options ${showFilterOptions ? 'show' : 'hide'}`}>
            <button onClick={() => handleFilterClick('Popular')}>Popular</button>
            <button onClick={() => handleFilterClick('Alcoholic')}>Alcoholic</button>
            <button onClick={() => handleFilterClick('Non_Alcoholic')}>Non-Alcoholic</button>
          </div>
        </div>
      </nav>
      <div>
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
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Redes Sociales</h3>
            <ul className="social-links">
              <li><a href="https://facebook.com"><i className="fab fa-facebook"></i> Facebook</a></li>
              <li><a href="https://twitter.com"><i className="fab fa-twitter"></i> Twitter</a></li>
              <li><a href="https://instagram.com"><i className="fab fa-instagram"></i> Instagram</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contacto</h3>
            <ul className="contact-links">
              <li><i className="fas fa-envelope"></i> contact @liquorluxe.com</li>
              <li><i className="fas fa-phone"></i> +1 (123) 456-7890</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Liquor Luxe. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
};

export default Cocktails;
