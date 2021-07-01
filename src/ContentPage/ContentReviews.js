import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import '../Filter/filterresultcard.css';
import './contentreviews.css';


const ContentReviews = ({user}) => {
    let {id} = useParams(); 
    const [rating, setRating] = useState('');
    const [discription, setDiscription] = useState('');
    const [content, setContent] = useState({});
    const [userReview, setUserReview] = useState(undefined);
    const [reviews, setReviews] = useState([]);
    const [found, setFound] = useState(true);
    const [statusMsg, setStatusMsg] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/getContentReviews', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    content_id: id,
                    user_email: user.email 
                })
            }).then(response => {
                if(!response.ok){  
                      setFound(false);
                }
                else{
                    response.json().then(result => {
                        console.log(result);
                        setReviews(result.reviews);
                        setUserReview(result.user_review);
                        setContent(result.content);
                    })
                }
            
            })
            .catch(err => {
                console.log('Error Connecting to Server')
            });

    }, [id, user]); 

    const changeRating = (event) => {
        if(event.target.value <= 10 && event.target.value >= 0){
            setRating(event.target.value);
        }
    }
     
    const onAddClick = () => {
        if(rating === ''){
            setStatusMsg('must rate the movie from 0 to 10');
        }
        else{
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            if(month < 10){
                month = '0' + month
            } 
            let day = today.getDate();
            if(day < 10){
                day = '0' + day;
            }
            let datetoday = `${year}-${month}-${day}`;
            fetch('http://localhost:4000/addContentReview', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    content_id: id,
                    user_email: user.email,
                    discription: discription,
                    rating: rating,
                    date: datetoday
                })
            }).then(response => {
                if(!response.ok){  
                    setStatusMsg('error adding review')
                }
                else{
                    response.json().then(result => {
                        setStatusMsg('')
                        setUserReview({
                            RATING: rating,
                            DISCRIPTION: discription,
                            REVIEW_DATE: datetoday,
                        })
                        setRating('')
                        setDiscription('')
                        console.log(result);
                    })
                }
            
            })
            .catch(err => {
                console.log('Error Connecting to Server')
            });
        }
        
    }

    const onEditClick = () => {
        if(userReview.RATING === ''){
            setStatusMsg('must rate the movie from 0 to 10');
        }
        else{
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            if(month < 10){
                month = '0' + month
            } 
            let day = today.getDate();
            if(day < 10){
                day = '0' + day;
            }
            let datetoday = `${year}-${month}-${day}`;
            fetch('http://localhost:4000/editContentReview', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    content_id: id,
                    user_email: user.email,
                    discription: userReview.DISCRIPTION,
                    rating: userReview.RATING,
                    date: datetoday
                })
            }).then(response => {
                if(!response.ok){  
                    setStatusMsg('error editing review')
                }
                else{
                    response.json().then(result => {
                        setStatusMsg('')
                    })
                }
            
            })
            .catch(err => {
                console.log('Error Connecting to Server')
            });
        }
        
    }

    const onDeleteClick = () => {
        fetch('http://localhost:4000/deleteContentReview', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                content_id: id,
                user_email: user.email,
                rating: userReview.RATING
            })
        }).then(response => {
            if(!response.ok){  
                setStatusMsg('error deleting review')
            }
            else{
                response.json().then(result => {
                    setUserReview(undefined)
                    setStatusMsg('')
                })
            }
        
        })
        .catch(err => {
            console.log('Error Connecting to Server')
        });
        
    }

    const changeUserReviewRating = (event) => {
        if(event.target.value >= 0 && event.target.value <= 10){
            setUserReview(userReview => ({
                ...userReview,
                RATING : event.target.value,
            }))
        }
    }
    const changeUserReviewDiscription = (event) => {
        setUserReview(userReview => ({
            ...userReview,
            DISCRIPTION : event.target.value,
          }))
    }

    return(
        <div className = 'content-reviews-container'>
            {found === false ? (<h1>404 not found</h1>)
            :(
            <div className = 'content-reviews-content'>
                <h1>{content.TITLE}</h1>
                {userReview !== undefined ? (
                    <label id = 'fetchedreviewscount'>({reviews.length + 1} reviews)</label>
                ):(
                    <label id = 'fetchedreviewscount'>({reviews.length} reviews)</label>
                )}
                
                {user.email === '' ? null 
                :[userReview === undefined ? (
                    <div className = 'current-user-review'>
                        <div className = 'filterresultcard-titleandrating'>
                            <h3>Your Review</h3>
                            <div className = 'current-review-star-rating'>
                                <label>★</label>
                                <input value = {rating} onChange = {changeRating} id = 'currentuser-review-input-rating' type = 'number' placeholder = '10'></input>
                            </div>
                        </div>
                        <div className = 'currentuser-review-inputs'>
                            <textarea value = {discription} onChange = {(event) => setDiscription(event.target.value)} id = 'currentuser-review-input-textarea' maxLength = '500' placeholder = 'comment...'></textarea>
                        </div>
                        <button onClick = {onAddClick}>Add</button>
                        <label style = {{'color' : 'red'}}>{statusMsg}</label>
                    </div>
                ):(
                    <div className = 'display-user-review'>
                       <div className = 'current-user-review'>
                            <input id = 'current-user-review-check' type = 'checkbox'></input>
                            <div className = 'filterresultcard-titleandrating'>
                                <div className = 'current-user-review-header'>
                                    <h3>Your Review</h3>
                                    <label htmlFor = 'current-user-review-check'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg>
                                    </label>
                                </div>
                                <div className = 'current-review-star-rating'>
                                    <label>★</label>
                                    <input onChange = {changeUserReviewRating} value = {userReview.RATING} id = 'currentuser-review-input-rating' type = 'number' placeholder = '10'></input>
                                </div>
                            </div>
                            <label id = 'review-date-lbl'>{userReview.REVIEW_DATE}</label>
                            <div className = 'currentuser-review-inputs'>
                                <textarea onChange = {changeUserReviewDiscription} value = {userReview.DISCRIPTION} id = 'currentuser-review-input-textarea' maxLength = '500' placeholder = 'comment...'></textarea>
                            </div>
                            <div className = 'review-editanddelete-btn'>
                                <label id = 'confirmeditreviewbtn' htmlFor = 'current-user-review-check' onClick = {onEditClick}>Confirm</label>
                                <button onClick = {onDeleteClick}>Delete</button>
                            </div>
                            <label style = {{'color' : 'red'}}>{statusMsg}</label>
                        </div> 
                    </div>
                )
                ]}
                <ul>
                    {reviews.map(review => {
                        return (<li>
                            <div className = 'filterresultcard-container'>
                                <div className = 'filterresultcard-content'>
                                    <div className = 'filterresultcard-details'>
                                        <label id = 'filterresultcard-details-releasedate'>{review.REVIEW_DATE}</label>    
                                        <div className = 'filterresultcard-titleandrating'>
                                            <h3 id = 'filterresultcard-details-title'>{review.NAME}</h3>
                                            <label id = 'filterresultcard-details-rating'>★ {review.RATING}</label>
                                        </div>
                                        <p id = 'filterresultcard-detail-overview'>{review.DISCRIPTION}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        )
                    })}
                </ul>
            </div>
            )}
        </div>
    )
}

export default ContentReviews;