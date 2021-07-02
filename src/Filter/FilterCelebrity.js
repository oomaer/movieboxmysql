import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import './filtercontent.css';
import FilterResultCard from './FilterResultCard';

const FilterCelebrity = ({type}) => {
    const {filter} = useParams();
    const [data, setData] = useState([]);
    const [found, setFound] = useState(true);

    useEffect(() => {
        fetch('https://moviebox-demo-webapp.herokuapp.com/filterCelebrity', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    filter: filter,
                    rows: 25,
                    type: type
                })
            }).then(response => {
                if(!response.ok){  
                    setFound(false);  
                }
                else{
                    response.json().then(result => {
                        console.log(result);
                        setData(result);
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
                <label id = 'fetchedresultscount'>({data.length} results fetched)</label>
                <ul>
                    {data.map(item => {
                        return (<li>
                            <FilterResultCard item = {item} type = {type}/> 
                        </li>
                        )
                    })}
                </ul>
            </div>
            )}
        </div>
    )
}

export default FilterCelebrity;