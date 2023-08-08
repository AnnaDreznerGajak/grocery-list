import {FaTrashAlt} from 'react-icons/fa';
export const LineItem = ({item, handleChange, handleDelete}) => {

    return (
        <tr>
            <td>{item.id}</td>
            <td><input type="checkbox" checked={item.checked} onChange={() => handleChange(item.id)} /></td>
            <td><p style={(item.checked) ? { textDecoration: 'line-through' } : {}}>{item.item}</p></td>
            <td><FaTrashAlt role="button" tabIndex="0" onClick={() => handleDelete(item.id)} /></td>
        </tr>

    )
}