import React, { Component } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DropdownWithDate from '../../event-search/custom-dropdown';
import ResetButton from '../button/reset-button';
import DropdownContext from '../dropdown/dropdown-context';

class SearchFilterToolbar extends Component {
  render() {
    const { data } = this.props;
    return (
      <ButtonToolbar className="justify-content-center">
        <DropdownContext data={data} />
        <DropdownWithDate />
        <ResetButton />
      </ButtonToolbar>
    );
  }
}

SearchFilterToolbar.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SearchFilterToolbar;
