import {LineItem} from "./LineItem";

export const ItemList = ({ items, handleChange, handleDelete }) => {

    return (
        <table>
            <tbody>
                {items.map((item) => (
                    <LineItem item={item} handleChange={handleChange} handleDelete={handleDelete} key={item.id}/>
                ))}
            </tbody>
        </table>

    )
}