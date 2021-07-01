import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import './filtercontent.css';
import FilterResultCard from './FilterResultCard';

const FilterContent = ({type}) => {
    const {filter} = useParams();
    const [filteredContent, setFilteredContent] = useState([]);
    const [found, setFound] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/filterContent', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    filter: filter,
                    type: type,
                    rows: 25
                })
            }).then(response => {
                if(!response.ok){  
                    setFound(false);  
                }
                else{
                    response.json().then(result => {
                        console.log(result);
                        setFilteredContent(result);
                    })
                }
            
            })
            .catch(err => {
                this.setState({statusMsg: 'Error Connecting to Server'})
            });

    }, [filter, type]); 



    return(
        <div className = 'filter-results-container'>
            {found === false ? (<h1>404 not found</h1>)
            :(
            <div className = 'filter-results-content'>
                <h1>Showing Results</h1>
                <label id = 'fetchedresultscount'>({filteredContent.length} results fetched)</label>
                <ul>
                    {filteredContent.map(content => {
                        return (<li>
                            <FilterResultCard item = {content} type = {type}/> 
                        </li>
                        )
                    })}
                </ul>
            </div>
            )}
        </div>
    )
}

export default FilterContent;