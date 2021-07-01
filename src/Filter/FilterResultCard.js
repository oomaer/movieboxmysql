import {Link} from 'react-router-dom';
import './filterresultcard.css';

const FilterResultCard = ({item, type}) => {
    
    return(
        <div className = 'filterresultcard-container'>
            <div className = 'filterresultcard-content'>
                {type === 'celebrity' 
                ?(
                <Link to = {`/celebrity/${item.ID}`}>
                    <div className = 'filterresultcard-image-container'>
                        <img alt = 'card' src = {item.IMAGE}></img> 
                    </div>
                </Link>
                )
                :(
                <Link to = {`/content/${item.ID}`}>
                    <div className = 'filterresultcard-image-container'>
                        <img alt = 'card' src = {item.IMAGE}></img> 
                    </div>
                </Link>         
                )}
                <div className = 'filterresultcard-details'>
                    {type === 'celebrity' 
                    ? (
                        <label id = 'filterresultcard-details-releasedate'>{item.BIRTHDATE.split('-')[0]}</label>    
                    )
                    :(
                        <label id = 'filterresultcard-details-releasedate'>{item.RELEASEDATE.split('-')[0]}</label>
                    )}
                    <div className = 'filterresultcard-titleandrating'>
                        {type === 'celebrity'
                        ?(
                        <Link to = {`/celebrity/${item.ID}`}>
                            <h3 id = 'filterresultcard-details-title'>{item.TITLE || item.NAME}</h3>
                        </Link>
                        ):
                        (
                        <Link to = {`/content/${item.ID}`}>
                            <h3 id = 'filterresultcard-details-title'>{item.TITLE || item.NAME}</h3>
                        </Link>
                        )}
                        <label id = 'filterresultcard-details-rating'>★ {item.VOTEAVG || item.POPULARITY}</label>
                    </div>
                    {type === 'celebrity' 
                    ?(
                    <p id = 'filterresultcard-detail-overview'>{`${item.BIOGRAPHY.substring(0, 250)}`}</p>
                    )
                    :(
                    <p id = 'filterresultcard-detail-overview'>{item.OVERVIEW }</p>
                    )}
                </div>

            </div>
        </div>
    )
}
export default FilterResultCard;