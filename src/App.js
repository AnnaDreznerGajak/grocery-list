import React, { useEffect, useState } from "react";
import { Header } from './Header';
import { Content } from './Content';
import { AddItem } from "./AddItem";
import { SearchItem } from "./SearchItem";
import { apiRequest } from "./apiRequest";

function App() {

  const API_URL = "http://localhost:3500/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchItems = async () => {

      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Dupa blada!");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);

      } catch (err) {
        console.log(err.stack);
        setFetchError(err.message);
      }
      finally {
        setIsLoading(false);
      }
    }

    fetchItems();
  }, [])

  const setAndSafeItems = (list) => {
    setItems(list);
    localStorage.setItem('shoppingList', JSON.stringify(list));
  }

  const addItem = async (item) => {

    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setAndSafeItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }

    console.log(postOptions);

    const result = await apiRequest(API_URL, postOptions);
    if(result) setFetchError(result);
  }

  const handleChange = async (id) => {
    const listItems = items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
    setAndSafeItems(listItems);

    const myItem = listItems.filter((item) => (item.id) === id);

    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }

    const reqURL = `${API_URL}/${id}`;

    const result = await apiRequest(reqURL, updateOptions);
    if(result) setFetchError(result);

  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => (item.id !== id));
    setAndSafeItems(listItems);

    const myItem = listItems.filter((item) => (item.id) === id);

    const deleteOptions = {
      method: 'DELETE'
    }

    const reqURL = `${API_URL}/${id}`;

    const result = await apiRequest(reqURL, deleteOptions);
    if(result) setFetchError(result);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header title="Groceries List" />
      <SearchItem search={search} setSearch={setSearch} />
      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />

      <main>
        {isLoading && <p>{"Loading items..."}</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading &&
          <Content items={items.filter((item) => (item.item).toLowerCase().includes(search.toLowerCase()))} handleDelete={handleDelete} handleChange={handleChange} />
        }
      </main>


    </div>
  );
}

export default App;
