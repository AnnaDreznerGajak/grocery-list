import {ItemList} from "./ItemList";

export const Content = ({items, handleChange, handleDelete}) => {

  return (
    <main>

    {(items.length == 0) ? (<h1>Lista jest pusta</h1>) :(
        <ItemList items={items} handleChange={handleChange} handleDelete={handleDelete}/>
    )}
      
    </main>
  );
}
