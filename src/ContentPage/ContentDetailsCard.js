import  {useState} from 'react';
import {Link} from 'react-router-dom';
import './contentdetailscard.css';

const ContentDetailsCard = ({content, details}) => {
    const [currSeasonIndex, setCurrSeasonIndex] = useState(0);
    const [seasoncardAnimation, setSeasonCardAnimation] = useState('');

    const previousSeason = () => {
        if(currSeasonIndex > 0){
            setCurrSeasonIndex(currSeasonIndex - 1);
            setSeasonCardAnimation('animate__animated animate__fadeInLeft');
        }
    }
    
    const nextSeason = () => {
        if(currSeasonIndex < details.seasons.length){
            setCurrSeasonIndex(currSeasonIndex + 1);
            setSeasonCardAnimation('animate__animated animate__fadeInRight');
        }
    }

    let seasonbackground;
    if(details.seasons !== undefined && details.seasons.length !== 0 ){
       seasonbackground = {'background-image': `url(${details.seasons[currSeasonIndex].IMAGE})`};
    }
    return(
        <div className = 'content-details-card-container'>
            <div className = 'content-details-card'>
                <div className = 'content-details-card-topbar'>
                    <div className = 'content-details-card-topbar-left'>
                        <div>
                            <label className = 'contentdetailscard-topbar-left-toplbl' id = 'content-details-card-topbar-left-rating'>
                                {content.VOTEAVG}<span>/10</span>
                            </label>
                            <label className = 'contentdetailscard-topbar-left-btmlbl'>
                                {content.VOTECOUNT}
                            </label>
                        </div>
                        <div>
                            <label className = 'contentdetailscard-topbar-left-toplbl'>Popularity</label>
                            <label className = 'contentdetailscard-topbar-left-btmlbl'>
                                {content.POPULARITY}
                            </label>
                        </div>
                        <div>
                            <label className = 'contentdetailscard-topbar-left-toplbl'>Released</label>
                            <label className = 'contentdetailscard-topbar-left-btmlbl' id = 'contentdetailscard-topbar-releasedate'>
                                {content.RELEASEDATE}
                            </label>
                        </div>
                    </div>
                    <div className = 'content-details-card-topbar-right'>
                        <a href = {`${window.location.href.split('/#contentdetails-otherdetails-crew')[0]}/#contentdetails-otherdetails-crew`} >Full Cast and Crew</a>
                        <Link to = {`/content/${content.ID}/reviews`} >User Reviews</Link>
                    </div>
                </div>


                <div className = 'content-details-card-body'>
                    <div className = 'content-details-card-body-details'>
                        <div className = 'card-body-details-topdetails'>
                            <img id = 'content-main-image' alt = 'content' src = {content.IMAGE}></img>
                            <div className = 'card-details-overview-stars-crew'>
                                <p id = 'content-details-card-overview'>{content.OVERVIEW}</p>
                                {content.TYPE === 'movie' 
                                ?(
                                    <div className = 'card-details-overview-stars-crew-crew'>
                                        <label>Director:  </label> 
                                        {details.crew.map((item, index) => {
                                            if(item.ROLE === 'Director'){
                                                if(index === 0){
                                                    return (<label className = 'contentdetails-fg2'>{item.NAME} </label>)
                                                }
                                                else{
                                                    return (<label className = 'contentdetails-fg2'>, {item.NAME} </label>)
                                                }
                                            }
                                            else{
                                                return null;
                                            }
                                        })}
                                    </div>
                                ): (details.creators !== undefined ?
                                (
                                    <div className = 'card-details-overview-stars-crew-crew'>
                                        <label>Creators:  </label> 
                                        {details.creators.map((item, index) => {
                                            if(index === 0){
                                                return <label className = 'contentdetails-fg2'>{item.NAME} </label>
                                            }
                                            else{
                                                return <label className = 'contentdetails-fg2'>, {item.NAME} </label>
                                            }
                                        })}
                                    </div>
                                ):(null))}

                                <div className = 'card-details-overview-stars-crew-stars'>
                                    <label>Stars: </label> 
                                    {details.cast.map((item, index) =>{
                                        if(index === 0){
                                            return <label className = 'contentdetails-fg2'> {item.NAME} </label>
                                        }
                                        else{
                                            return <label className = 'contentdetails-fg2'>, {item.NAME} </label>
                                        }
                                    })}

                                </div>
                            </div>
                        </div>

                    {/* lower portion of the card body */}
                        <div className = 'contentcard-contentdetails-otherdetails'>
                            <div id = 'contentdetails-otherdetails-cast' className = 'contentdetails-otherdetails-castandcrew'>
                                <h2>Cast</h2>
                                {details.cast.map(item => {
                                    return (
                                        <div className = 'contentdetails-otherdetails-member'>
                                            <label>{item.NAME}</label>
                                            <label>{item.ROLE}</label>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className = 'contentdetails-storyline contentdetails-block'>
                                <h2>Storyline</h2>
                                <div className = 'contentdetails-contentelement'>
                                    <h4 className = 'contentdetails-contentelement-headerlbl'>Plot Keywords:  </h4>
                                    {details.plot_keywords.map((item, index) => {
                                        if(details.plot_keywords.length - 1 === index){
                                            return <label>{item.NAME}  </label>    
                                        }
                                        else{
                                            return <label>{item.NAME},  </label>
                                        }
                                    })}
                                </div>
                                <div className = 'contentdetails-contentelement'>
                                    <h4 className = 'contentdetails-contentelement-headerlbl'>Genres:  </h4> 
                                    {details.genres.map((item, index) => {
                                        if(details.genres.length - 1 === index){
                                            return <label>{item.NAME}  </label>    
                                       }
                                       else{
                                           return <label>{item.NAME},  </label>
                                       }
                                    })}   
                                </div>
                                    <div className = 'contentdetails-contentelement'>
                                    <h4 className = 'contentdetails-contentelement-headerlbl'>Tagline:  </h4> 
                                    <label>{content.TAGLINE}</label>   
                                </div>
                            </div>

                            <div className = 'contentdetails-details contentdetails-block'>
                                <h2>Details </h2>
                                <div className = 'contentdetails-contentelement'>
                                    <h4 className = 'contentdetails-contentelement-headerlbl'>Release Date:  </h4>
                                    <label>{content.RELEASEDATE}</label>
                                </div>
                                <div className = 'contentdetails-contentelement'>
                                    <h4 className = 'contentdetails-contentelement-headerlbl'>Languages:  </h4>
                                    {details.languages.map((item, index) => {
                                        if(details.languages.length - 1 === index){
                                            return <label>{item.NAME}  </label>    
                                        }
                                        else{
                                            return <label>{item.NAME},  </label>
                                        }
                                    })}
                                </div>
                                <div className = 'contentdetails-contentelement'>
                                    <h4 className = 'contentdetails-contentelement-headerlbl'>Filming Locations:  </h4>    
                                    {details.locations.map((item, index) => {
                                        if(details.locations.length - 1 === index){
                                            return <label>{item.NAME}  </label>    
                                        }
                                        else{
                                            return <label>{item.NAME},  </label>
                                        }
                                    })}
                                </div>
                                <div className = 'contentdetails-contentelement'>
                                    <h4 className = 'contentdetails-contentelement-headerlbl'>Runtime:  </h4>
                                    <label>{content.RUNTIME}  minutes</label>
                                </div>
                                <div className = 'contentdetails-contentelement'>
                                    <h4 className = 'contentdetails-contentelement-headerlbl'>Rating:  </h4>
                                    <label>{content.VOTEAVG} / 10</label>
                                </div>
                                <div className = 'contentdetails-contentelement'>
                                    <h4 className = 'contentdetails-contentelement-headerlbl'>Total Votes:  </h4>
                                    <label>{content.VOTECOUNT}</label>
                                </div>
                            </div>
                            <div className = 'contentdetails-companycredits contentdetails-block'>
                                <h2>Company Credits</h2>
                                <div className = 'contentdetails-contentelement'>
                                    <h4 className = 'contentdetails-contentelement-headerlbl'>Production Companies:  </h4>
                                    {details.production_co.map((item, index) => {
                                    if(details.production_co.length - 1 === index){
                                        return <label>{item.NAME}  </label>    
                                    }
                                    else{
                                        return <label>{item.NAME},  </label>
                                    }
                                    })}
                                </div>
                            </div>

                            <div id = 'contentdetails-otherdetails-crew' className = 'contentdetails-otherdetails-castandcrew'>
                                <h2>Crew</h2>
                                {details.crew.map(item => {
                                    return (
                                        <div className = 'contentdetails-otherdetails-member'>
                                            <label>{item.NAME}</label>
                                            <label>{item.ROLE}</label>
                                        </div>
                                    )
                                })}
                            </div>

                            {content.TYPE === 'movie'  
                            ?(
                                <div className = 'contentdetails-otherdetails-boxoffice contentdetails-block'>
                                    <h2>Box Office</h2>
                                    <div className = 'contentdetails-contentelement'>
                                        <h4 className = 'contentdetails-contentelement-headerlbl'>Budget:  </h4>
                                        <label>{content.movie.BUDGET} $</label>
                                    </div>
                                    <div className = 'contentdetails-contentelement'>
                                        <h4 className = 'contentdetails-contentelement-headerlbl'>Revenue:  </h4>
                                        <label>{content.movie.REVENUE} $</label>
                                    </div>
                                </div>
                            )
                            : details.seasons !== undefined && details.seasons.length !== 0 ?
                            (
                                <div className = 'contentdetails-block'>
                                    <h2>Seasons</h2>
                                    <div className = 'contentdetails-otherdetails-seasons'>
                                        
                                        {currSeasonIndex === 0 
                                        ?(
                                            <svg className = 'seasons-arrow-btn' xmlns="http://www.w3.org/2000/svg" fill="gray" pointer-events ='none' class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                            </svg>)
                                        :(
                                            <svg className = 'seasons-arrow-btn' onClick = {previousSeason}  xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                            </svg>
                                        )}  

                                        <div id = {`seasoncard-${currSeasonIndex}`} className = {`contentdetails-seasondetails-container ${seasoncardAnimation}`} style = {seasonbackground}>
                                            <div className = 'contentdetails-seasondetails-details'>
                                                <h4>Season {details.seasons[currSeasonIndex].SEASON_NO}</h4>
                                                <label>Airdate: {details.seasons[currSeasonIndex].AIRDATE}</label>
                                                <label>{details.seasons[currSeasonIndex].EPISODES} Episodes</label>
                                            </div>
                                            <div className = 'animate__animated animate__fadeInUp' id = 'contentdetails-seasondetails-overview'>
                                                <p>{details.seasons[currSeasonIndex].OVERVIEW}</p>
                                            </div>
                                        </div>
                                        
                                        {currSeasonIndex === details.seasons.length - 1 
                                        ?(
                                            <svg className = 'seasons-arrow-btn' xmlns="http://www.w3.org/2000/svg" fill="gray" pointer-events ='none' class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                            </svg>
                                        ) 
                                        :
                                        (
                                          <svg className = 'seasons-arrow-btn' onClick = {nextSeason} xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                            </svg>
                                        )}  
                                    </div>
                                    
                    
                                </div>
                                
                            ):(null)}
                            <div className = 'contentdetails-otherdetails-boxoffice contentdetails-block'>
                               
                            </div>

                        </div>


                    </div>



                    <div className = 'content-details-card-body-pictures'>
                        {details.pictures.map(item => {
                            return <img alt = 'link' src = {item.LINK}></img>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentDetailsCard;