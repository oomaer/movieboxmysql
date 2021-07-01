import  {useState} from 'react';
import './addelement.css';

const AddCrew = ({type, added_arr, addItem, removeItem}) =>{
    const [name, setName] = useState('');  
    const [role, setRole] = useState('');

    const changeName = (event) => {
        setName(event.target.value);
    }

    const changeRole = (event) => {
        setRole(event.target.value);
    }

    const onAddClick = () => {
        if(name !== '' && role !== ''){
            let object = {NAME: name, ROLE: role}
            addItem(type, object);
            setName('');
            setRole('');
        }
    }

    const onCrossClick = (item, index) => {
        removeItem(type, index, item);
    }

    return(
        <div className = 'add-content-element-container'>
            <div className = 'add-content-element-content'>
                <h3>{type}</h3>
                <div className = 'input-element-details  input-element-tvdetails'>
                    <input maxLength = '55' value = {name} onChange = {changeName} placeholder = 'name'></input>
                    <input maxLength = '32' value = {role} onChange = {changeRole} placeholder = 'role'></input>
                    <button className = 'add-element-btn' onClick = {onAddClick}>Add</button>
                </div>
                <ul className = 'added-elements'>
                    {added_arr.map((item, index) => {
                        return(
                            <li className = 'added-element-card'>
                                    <label className = 'added-element-card-name'>{item.NAME}</label>
                                    <label className = 'added-element-card-cross' onClick = {() => onCrossClick(item, index)}>x</label>
                            </li>
                        )
                    })}
                </ul>

            </div>
        </div>
    )
}
export default AddCrew;