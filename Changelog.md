# Changelog

## Objective

1. Add the ability to delete items.
2. Be able to mark items as complete. And then toggle them back to incomplete.
3. Add a filter than can be toggled to hide completed items.


## Add the ability to delete items.

### Create new action and handler for delete action

In `logic/todos`

```js
export const DELETE_ITEM = 'qgo/assessment/DELETE_ITEM';

export const deleteItem = itemId => {
  return { type: DELETE_ITEM, itemId };
};
```

Added a new redux action case, to return a new items state with the item to be deleted filtered away

```js
    case DELETE_ITEM:
      const itemsWithIdDeleted = state.items.filter(item => item.id === action.id)

      return {
        ...state,
        items: itemsWithIdDeleted
      }
```

## Create Item Display component with Delete button

Created new component `ItemDisplay` to control display of each item, including a new `Delete` button hooked up to new `onDelete` action.

The added delete button, ready for testing:

```jsx
  <input
    className="itemDelete-button"
    type="button"
    value="Delete Task"
    onClick={() => {
      onDelete(item.id);
    }}
  />
```

### Use ItemDisplay in ItemsList

Used `ItemDisplay` in `ItemsList` to display each item in list.
Passing in the item to display and the onDelete action handler.

```js
{items.map(item => new ItemDisplay({ item, onDelete }))}
```

### Update tests for delete case

```js
  it('should call onDelete with the item deleted', () => {
    const onDeleteMock = jest.fn();
    const renderedItem = mount(
      <ItemDisplay {...defaultProps} onDelete={onDeleteMock} />
    );
    renderedItem.find('.itemDelete-button').simulate('click');
    expect(onDeleteMock.mock.calls.length).toBe(1);
  });
```

To test clicking `delete` removes an item, I want to extend the tests for `ItemList` to include a case where I simulate a click on the first `delete` button found, then test that there are one less delete buttons still remaining (due to redux reducing the state to one less item, the item filtered away by Id).

However, since I haven't worked with React and Redux for quite a while, and never workd with Jest, I'm not sure how to hook this up correctly.

```js
// import { onDelete } from '../../ItemDisplay';

const defaultProps = {
  items: [],
  // onDelete -> trigger state update via redux
};
```

```js
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
```

Perhaps I could create a mock implementaton of onDelete which updates items directly, outside of redux? Very hacky!

### Toggle item as complete/incomplete

Be able to mark items as complete. And then toggle them back to incomplete.

I would extend the ItemDisplay once more, adding a button or checkbox with a `onToggle` click handler to trigger a new redux action `TOGGLE_COMPLETED` which would inverse the complete setting on/off (ie. a `Boolean`).

Then add tests similar to the case for delete, except I could keep the test to ItemDisplay this time as it has no side-effect on the list.

### Add completed filter

Add a filter than can be toggled to hide completed items.

Haven't played with React filters, but sure it is pretty easy.

I would likely have a global toggle button that feeds into global state `filter` (Boolean). Then have the Items list iterator which is a `map`, instead `filter`, where the filter function uses the global filter state to determine how to filter (or let all items pas through unfiltered).

I would then extend the `ItemsList` test cases with additional tests to simulate toggling filter on and off, where at least one item starts off as completed and use Jest to test if this item is hidden (ie. not displayed in DOM).

## Done

Back to work.


