import React, { Component } from 'react';
import {
  Tab, Tabs, Container, Button, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Api from '../../services/api';
import About from './restaurant-about';
import Menu from '../menu-views/menu-view';
import '../../styles/menu.css';
import '../../styles/restaurant-item.css';
import Feedback from '../feedback/feedback';

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {},
      isFetching: false,
      selectedTab: this.props.selectedTab,
    };
  }

  async componentDidMount() {
    this.getOne();
  }

  getOne() {
    const { match } = this.props;
    Api.getOne('restaurants', match.params.id)
      .then((response) => {
        if (response.error) {
          // eslint-disable-next-line no-console
          console.error(response);
          return;
        }
        this.setState({
          restaurant: response.data,
          isFetching: true,
        });
      });
  }

  render() {
    const { isFetching, restaurant, selectedTab } = this.state;
    const { match: { params: { id } }, isAuthenticated } = this.props;

    let newOrderBtn;
    if (isAuthenticated) {
      newOrderBtn = (
        <Link to={{
          pathname: `/restaurants/${id}/new-order`,
          state: {
            restaurantName: restaurant.name,
          },
        }}
        >
          <span className="d-inline-block ml-5">
            <Button>Make order</Button>
          </span>
        </Link>
      );
    } else {
      newOrderBtn = (
        <OverlayTrigger
          key="right"
          placement="right"
          overlay={<Tooltip id="tooltip-disabled">You need to login before to make order</Tooltip>}
        >
          <span className="d-inline-block ml-5">
            <Button disabled style={{ pointerEvents: 'none' }}>Make order</Button>
          </span>
        </OverlayTrigger>
      );
    }

    return (
      <Container className="restaurant-container">
        <h2>{restaurant.name}</h2>
        {newOrderBtn}
        <Tabs
          activeKey={selectedTab}
          onSelect={(key) => this.setState({ selectedTab: key })}
        >
          <Tab eventKey="about" title="About">
            <About restaurant={restaurant} isFetching={isFetching} />
          </Tab>
          <Tab eventKey="menu" title="Menu">
            <Menu id={id} isAuthenticated={isAuthenticated} />
          </Tab>
          <Tab eventKey="events" title="Events">
            <h3>Events</h3>
          </Tab>
          <Tab eventKey="feedback" title="Feedback">
            <Feedback id={id} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

Restaurant.propTypes = {
  match: PropTypes.any.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  selectedTab: PropTypes.string,
};

Restaurant.defaultProps = {
  selectedTab: 'about',
};

export default Restaurant;
