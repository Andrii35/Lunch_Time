import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/navigation-bar';
import FooterBar from './components/footer-bar';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import RestaurantList from './pages/restaurant-list';
import Login from './pages/login';
import Registration from './pages/registration';
import Map from './pages/map';
import NoMatch from './pages/no-match';
import Events from './pages/events';
import Restaurant from './components/restaurant/restaurant-item';
import Profile from './components/profile/profile';
import NewOrder from './components/order/new-order';
import Auth from './services/auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    if (Auth.isAuthenticated()) {
      this.setState({
        isAuthenticated: true,
      });
    }
  }

  handleLogin() {
    this.setState({ isAuthenticated: true });
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <Router>
        <NavigationBar isAuthenticated={isAuthenticated} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/events" component={Events} />
          <Route path="/restaurants/:id/new-order" component={NewOrder} />
          <Route path="/restaurants/:id" component={Restaurant} />
          <Route path="/restaurants" component={RestaurantList} />
          <Route
            path="/login"
            render={(routeProps) => {
              return <Login loginHandler={() => { this.handleLogin(); }} {...routeProps} />;
            }}
          />
          <Route path="/registration" component={Registration} />
          <Route path="/map" component={Map} />
          <Route path="/contact" component={Contact} />
          <Route path="/profile" component={Profile} />
          <Route path="" component={NoMatch} />
        </Switch>
        <FooterBar />
      </Router>
    );
  }
}

export default App;
