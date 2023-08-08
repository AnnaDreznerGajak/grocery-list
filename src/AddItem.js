import {FaPlus} from 'react-icons/fa';

export const AddItem = ({newItem, setNewItem, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="addItem">Add new Item</label>
        <input type="text" id="addItem" placeholder="Add item" value={newItem} onChange={(e) => setNewItem(e.target.value)}/>
        <button type="submit"><FaPlus/>Add item</button>
    </form>
  )
}
