import {Link} from 'react-router-dom';
import './contentpagecover.css';

const ContentPageCover = ({content, details, admin}) => {
    const backgroundimage = {'background-image': `url(${content.COVER})`};
    return(
        <div className = 'contentpage-cover-container' style = {backgroundimage}>
            <div className = 'contentpage-cover-content'>
                <div className = 'contentpage-cover-content-details'> 
                    <label>{content.RELEASEDATE.split('-')[0]}</label>
                    <h1>{content.TITLE}</h1>
                    <div className = 'contentpage-cover-small-details'>
                        <label id = 'contentpage-cover-runtime'>{`${content.RUNTIME} mins`}</label>
                        <div className = 'contentpage-cover-genres'>
                        {details.genres.map((item, index) => {
                            if(index===0){
                                return <label>     |     {item.NAME}</label>
                            }
                            else{ 
                                return <label>,  {item.NAME}</label> 
                            }
                        })}
                        </div>
                        {content.TYPE === 'movie' 
                        ? (<label>    |    Movie</label>)
                        : (<label>    |    TV Series</label>)
                        }
                        
                    </div>
                    <div className = 'content-details-cover-btns'>
                        {content.TRAILER !== '' ? (
                            <a rel="noreferrer" target="_blank" href = {content.TRAILER}><button id = 'watch-trailer-btn' className = ''>WATCH TRAILER</button></a>)
                        :(null)}
                        {admin ? (
                            <Link to = {`/admin/editcontent/${content.ID}`}><button id = 'watch-trailer-btn' className = ''>Edit</button></Link>
                        ):(null)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentPageCover;