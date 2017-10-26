import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ItemDisplay } from '../ItemDisplay'
import './styles.css';

export const ItemsList = ({ items, onDelete }) => {
  return (
    <div>
      <ul className="itemsList-ul">
        {items.length < 1 && <p id="items-missing">Add some tasks above.</p>}
        {items.map(item => ItemDisplay({ item, onDelete }))}
      </ul>
    </div>
  );
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return { items: state.todos.items };
};

export default connect(mapStateToProps)(ItemsList);
