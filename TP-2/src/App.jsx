import React from 'react';
import { Route, Switch } from 'wouter';
import Cocktails from './components/Product';
import CocktailDetails from './components/CocktailDetails';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" component={Cocktails} />
        <Route path="/cocktail/:id" component={CocktailDetails} />
      </Switch>
    </div>
  );
};

export default App;
