import './searchbar.css';
import {useState, useEffect, useRef} from 'react';
import './searchbarforcast.css';

function useOutsideAlerter(ref, SearchPeople) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                document.getElementById("search-results-Cast Members").style.display = 'none';
            }
            else{
                document.getElementById("search-results-Cast Members").style.display = 'block';
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, SearchPeople]);
}

const SearchBar = ({type, addItem}) => {

    const [searchInput, setSearchInput] = useState('');
    const [SearchPeople, setSearchPeople] = useState([]);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, SearchPeople);

    const onSearchChange = (event) => {
        setSearchInput(event.target.value);
        if(event.target.value === ''){
            setSearchPeople([]);
        }
        else{
            fetch('http://localhost:4000/search', {
                    method: 'post',
                    headers : {'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                        match: event.target.value,
                        from: type
                    }
                    )
                }).then(response => {
                    if(!response.ok){
                        console.log('error searching celebs');
                    }
                    else{
                        response.json().then(result => {
                            result.order = '';
                            result.character = '';
                            setSearchPeople(result);
                        })
                    }
                
                })
                .catch(err => {
                    console.log('error fetching celeb search results');
                });  
        }
    }

    const onListItemClick = (item) => {
        setSearchInput('');
        setSearchPeople([]);
        addItem(type, item);
    }

    const setCharacter = (event, index) => {
        let temparr = SearchPeople;
        temparr[index].character = event.target.value;
        setSearchPeople(temparr)
    }

    const setOrder = (event, index) => {
        let temparr = SearchPeople;
        temparr[index].order = event.target.value;
        setSearchPeople(temparr)
    }

    return(
            <div className="search-container">
                <div className="search-input" ref = {wrapperRef}>
                    <input type="text" value = {searchInput} onChange = {onSearchChange} placeholder="Type to search.."></input>
                    <div className="search-results-box" id = {`search-results-${type}`}>
                        {SearchPeople.map((item, index) => {
                            return (
                                <li className = 'cast-search-list-item' key = {index}>
                                    <div className = 'cast-search-list-top'>
                                        <label>{item.NAME}</label>
                                        <div className = 'searchbarforcast-inputs'>    
                                            <input value = {item.character} onChange = {(event) => setCharacter(event, index)} placeholder = 'character'></input>
                                            <div className = 'cast-search-item-cast-btm-row'>
                                                <input value = {item.order} onChange = {(event) => setOrder(event, index)} placeholder = 'order' type = 'number'></input>
                                                <button onClick = {() => onListItemClick(item)}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                    </li>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
    )
}

export default SearchBar;