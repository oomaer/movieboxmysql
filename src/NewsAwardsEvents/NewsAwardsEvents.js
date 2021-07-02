

import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import '../Filter/filtercontent.css';
import NewsAwardEventCard from './NewsAwardEventCard';
import LoadingScreen from '../LoadingScreen';

const NewsAwardsEvents = ({type, admin}) => {
    const {filter} = useParams();
    const [data, setdata] = useState([]);
    const [found, setFound] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://moviebox-demo-webapp.herokuapp.com/getNewsAwardsEvents', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    filter: filter,
                    type: type
                })
            }).then(response => {
                if(!response.ok){  
                    setFound(false); 
                    setLoading(false); 
                }
                else{
                    response.json().then(result => {
                        setdata(result);
                        setLoading(false);
                    })
                }
            
            })
            .catch(err => {
                this.setState({statusMsg: 'Error Connecting to Server'})
            });

    }, [filter, type]); 


    if(loading){
        return <LoadingScreen />
    }
    else{
        return(
            <div className = 'filter-results-container' id = {`filter-results-container-${type}`}>
                {found === false ? (<h1>404 not found</h1>):(
                <div className = 'filter-results-content'>
                    <h1>Showing Results</h1>
                    <label id = 'fetchedresultscount'>({data.length} results fetched)</label>
                    <ul>
                        {data.map(content => {
                            return (<li>
                                <NewsAwardEventCard item = {content} filter = {filter} admin = {admin}/> 
                            </li>
                            )
                        })}
                    </ul>
                </div>
                )}
            </div>
        )
    }
}

export default NewsAwardsEvents;