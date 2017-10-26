import React from 'react';
import { shallow, mount } from 'enzyme';
import { ItemDisplay } from '../index';
import { initialState } from '../../../logic/todos'

const defaultProps = {
  item: initialState.items[0],
  onDelete: f => f,
};

describe('ItemDisplay', () => {
  it('renders without crashing', () => {
    shallow(<ItemDisplay {...defaultProps} />);
  });

  it('should call onDelete with the item deleted', () => {
    const onDeleteMock = jest.fn();
    const renderedItem = mount(
      <ItemDisplay {...defaultProps} onDelete={onDeleteMock} />
    );
    renderedItem.find('.itemDelete-button').simulate('click');
    expect(onDeleteMock.mock.calls.length).toBe(1);
  });
});
