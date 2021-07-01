import  {useState} from 'react';
import './addelement.css';

const AddElements = ({type, added_arr, AddElement, removeElement}) =>{
    const [name, setName] = useState('');

    const changeName = (event) => {
        setName(event.target.value);
    }

    const onAddClick = () => {
        if(name !== ''){
            AddElement(name, type);
            setName('');
        }
    }

    const onCrossClick = (item, index) => {
        removeElement(item, index, type);
    }

    return(
        <div className = 'add-content-element-container'>
            <div className = 'add-content-element-content'>
                <h3>{type}</h3>
                <div className = 'input-element-details'>
                    {type === 'Pictures' 
                    ?(
                    <input maxLength = '500' value = {name} onChange = {changeName} placeholder = 'link'></input>
                    )
                    :(
                    <input maxLength = '55' value = {name} onChange = {changeName} placeholder = 'name'></input>
                    )}
                    <button className = 'add-element-btn' onClick = {onAddClick}>Add</button>
                </div>
                <ul className = 'added-elements'>
                    {added_arr.map((item, index) => {
                        return(
                            <li className = 'added-element-card'>
                                {type === 'Pictures' ? (
                                    <label className = 'added-element-card-name'>{item.LINK}</label>
                                ):
                                (
                                    <label className = 'added-element-card-name'>{item.NAME}</label>
                                )}
                                    <label className = 'added-element-card-cross' onClick = {() => onCrossClick(item, index)}>x</label>
                            </li>
                        )
                    })}
                </ul>

            </div>
        </div>
    )
}
export default AddElements;