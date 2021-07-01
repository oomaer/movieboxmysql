import { useState } from "react";
import './addelement.css';


const AddTVDetails = ({type, added_arr, addItem, removeItem}) => {
    
    const [airdate, setAirdate] = useState('');
    const [number, setNumber] = useState('');
    const [episodes, setEpisodes] = useState('');
    const [overview, setOverview] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');

    const onSeasonAddClick = () => {
        if(number !== '' && episodes !== '' && image !== ''){
            const object = {
                AIRDATE : airdate,
                EPISODES : episodes,
                OVERVIEW: overview,
                SEASON_NO: number,
                IMAGE: image
            }

            addItem(object, type);
            setAirdate('');
            setNumber('');
            setEpisodes('');
            setImage('');
            setOverview('');
        }
    }

    const onCreatorAddClick = () => {
        if(name !== '' && gender !== ''){
            let object = {
                NAME: name,
                GENDER: gender
            }
            addItem(object, type);
            setName('');
            setGender('');
        }
    }

    const onCrossClick = (item, index) => {
        removeItem(item, index, type);
    }

    return(
        <div className = 'add-content-element-container'>
            <div className = 'add-content-element-content'>
                <h3>{type}</h3>
                {type === 'Seasons' ? 
                (
                    <div className = 'input-element-details input-element-tvdetails'>
                        <input  type = 'date' value = {airdate} onChange = {(event) => setAirdate(event.target.value)} placeholder = 'airdate'></input>
                        <input  value = {episodes} type = 'number' onChange = {(event) => setEpisodes(event.target.value)} placeholder = 'episodes'></input>
                        <textarea maxLength = '1000' value = {overview} onChange = {(event) => setOverview(event.target.value)} placeholder = 'overview'></textarea>
                        <input type = 'number' value = {number} onChange = {(event) => setNumber(event.target.value)} placeholder = 'number'></input>
                        <input  maxLength = '500' value = {image} onChange = {(event) => setImage(event.target.value)} placeholder = 'image link'></input>
                        <button className = 'add-element-btn' onClick = {onSeasonAddClick}>Add</button>
                    </div>
                )
                :
                (
                    <div className = 'input-element-details input-element-tvdetails'>
                        <input maxLength = '55' value = {name}  onChange = {(event) => setName(event.target.value)} placeholder = 'name'></input>
                        <input maxLength = '10' value = {gender} onChange = {(event) => setGender(event.target.value)} placeholder = 'gender'></input>
                        <button onClick = {onCreatorAddClick} className = 'add-element-btn'>Add</button>

                    </div>
                )}
                <ul className = 'added-elements'>
                    {added_arr.map((item, index) => {
                        return(
                            <li key = {index} className = 'added-element-card'>
                                    <label className = 'added-element-card-name'>{item.NAME || item.SEASON_NO}</label>
                                    <label className = 'added-element-card-cross' onClick = {() => onCrossClick(item, index)}>x</label>
                            </li>
                        )
                    })}
                </ul>

            </div>
        </div>
    )

}

export default AddTVDetails;