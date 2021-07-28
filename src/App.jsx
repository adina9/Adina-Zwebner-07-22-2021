import { Switch, Route, HashRouter as Router } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader'
import { Favorites } from './pages/Favorites';
import { WeatherApp } from './pages/WeatherApp';

export function App() {
  return (
    <div className="App">
      <AppHeader />
      <Router>
        <Switch>
          <Route path='/favorites' component={Favorites} />
          <Route path='/' component={WeatherApp} />
        </Switch>
      </Router>
    </div>
  );
}


