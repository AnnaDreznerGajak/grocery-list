import React from 'react'

export const SearchItem = ({ search, setSearch }) => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <label>Search</label>
            <input type="text" id="search" role="searchbox"
                placeholder='Search item'
                value={search}
                onChange={(e) => setSearch(e.target.value)} />

        </form>
    )
}
