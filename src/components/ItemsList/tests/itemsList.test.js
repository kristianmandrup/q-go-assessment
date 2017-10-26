import React from 'react';
import { shallow } from 'enzyme';
import { ItemsList } from '../index';
// import { onDelete } from '../../ItemDisplay';

const defaultProps = {
  items: [],
  // onDelete: -> trigger state update via redux
};

describe('ItemsList', () => {
  it('renders without crashing', () => {
    shallow(<ItemsList {...defaultProps} />);
  });

  it('should display warning message if no items', () => {
    const renderedItem = shallow(<ItemsList {...defaultProps} items={[]} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(1);
  });

  it('should not display warning message if items are present', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(0);
  });

  it('should render items as list items', () => {
    const items = [{ id: 1, content: 'Test 1' }, { id: 2, content: 'Test 2' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('li')).toHaveLength(2);
  });

  it('should remove the item with button', () => {
    const item1 = { id: 1, content: 'Test 1' }
    const item2 = { id: 2, content: 'Test 2' }
    const items = [item1, item2];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('li')).toHaveLength(2);
    const firstButton = renderedItem.find('.itemDelete-button').first()
    firstButton.simulate('click');
    expect(renderedItem.find('.itemDelete-button')).toHaveLength(1)
  });

});
