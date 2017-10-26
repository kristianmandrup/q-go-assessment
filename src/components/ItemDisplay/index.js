import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem } from '../../logic/todos';
import './styles.css';

export const ItemDisplay = ({ item, onDelete }) => {
  return (
    <li key={item.id}>
      <span>{item.content}</span>
      <input
        className="itemDelete-button"
        type="button"
        value="Delete Task"
        onClick={() => {
          onDelete(item.id);
        }}
      />
    </li>
  );
};

ItemDisplay.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onDelete: newItem => dispatch(deleteItem(newItem)),
});

export default connect(null, mapDispatchToProps)(ItemDisplay);
