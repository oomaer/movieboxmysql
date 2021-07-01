
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import './celebritydetails.css';

const CelebrityDetails = ({admin}) => {
    const {id} = useParams();
    const [celebrity, setCelebrity] = useState({added_pictures: []});
    const [found, setFound] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/getCelebrity', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    id: id
                })
            }).then(response => {
                if(!response.ok){  
                    setFound(false);  
                }
                else{
                    response.json().then(result => {
                        console.log(result);
                        setCelebrity(result);
                    })
                }
            
            })
            .catch(err => {
                this.setState({statusMsg: 'Error Connecting to Server'})
            });

    }, [id]); 



    return(
        <div className = 'celebrity-details-container'>
            {found !== true ? (<h1>404 Not Found</h1>)
            :(
            <div className = 'celebrity-details-content'>
                <h1>Celebrity</h1>
                <div className = 'celebritycard-container'>
                    <div className = 'celebritycard-content'>
                        <div className = 'celebritycard-imageanddetails'>
                            <div className = 'celebritycard-image-container'>
                                <img alt = 'card' src = {celebrity.IMAGE}></img> 
                            </div>
                            <div className = 'celebritycard-details'>
                                <label id = 'celebritycard-details-releasedate'>{celebrity.BIRTHDATE}</label>
                                <h3 id = 'celebritycard-details-title'>{celebrity.NAME}</h3>
                                <label id = 'celebritycard-details-gender'>{celebrity.GENDER}</label>
                                <label id = 'celebritycard-details-department'>Known for {celebrity.DEPARTMENT}</label>
                                {admin ? (
                                    <Link to = {`/admin/editcelebrity/${celebrity.ID}`}><button id = 'celebritycard-details-editbtn'>Edit</button></Link>
                                ):(null)}
                            </div> 
                        </div>              
                        <label id = 'celebritycard-details-rating'>🔥 {celebrity.POPULARITY}</label>
                    </div>
                    
                </div>
                <div className = 'celebrity-details-biography'>
                    <h4>Biography:</h4>
                    <p id = 'celebritycard-detail-overview'>{celebrity.BIOGRAPHY}</p>
                </div>
                <div classsName = 'celebrity-details-pictures-container'>
                    <div className = 'celebrity-details-pictures-content'>
                        {celebrity.added_pictures.map(picture => {
                            return(
                                <div className = 'celebrity-details-picture-container'>
                                    <img alt = 'celebrity' src = {picture.LINK}></img>
                                </div>
                            )
                        }
                        )}
                    </div> 
                </div>
            </div>
            )}
        </div>
    )
}

export default CelebrityDetails;