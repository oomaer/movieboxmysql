
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import './cardssection1.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

const CardsSection1 = ({filter, classType}) => {

    const [data, setData] = useState([{COVER:'', RELEASEDATE: ''}]);
    const [scrollAnimation, setScrollAnimation] = useState(['zoom-in-right', 'zoom-in-left']);

    useEffect(() => {
        fetch('http://localhost:4000/filterContent', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    type: filter,
                    filter: 'popularity',
                    rows: 7
                })
            }).then(response => {
                if(!response.ok){  
                    console.log('error fetching data') 
                }
                else{
                    response.json().then(result => {
                        setData(result)
                    })
                }
            
            })
            .catch(err => {
                this.setState({statusMsg: 'Error Connecting to Server'})
            });
            Aos.init();
            if(classType === 'type1'){
                setScrollAnimation(['zoom-in-right', 'zoom-in-left'])
            }
            else if(classType === 'type2'){
                setScrollAnimation(['zoom-in-left', 'zoom-in-right'])
            }
    }, [classType, filter]); 

    return(
        <div className = 'cardsection1-container'>
            <div className = 'cardsection1-content '>
                <div className = 'cardsection1-header'>
                    {filter === 'movies' ? (<h2>Popular Movies</h2>)
                    :(<h2>Popular TV Series</h2>)}
                    <label></label>
                </div>
                <div className = {`cardsection1-cards cardsection1-cards-${classType}`}>
                    <Link to = {`/content/${data[0].ID}`}>
                        <div className = 'cardsection1-leftcard-container' data-aos = {scrollAnimation[0]} data-aos-duration="800" 
                        style = {{'background-image' : `LINEAR-GRADIENT(46deg, RGB(0, 0, 0, 0.7) 10%, transparent 90%),
                                                        url(${data[0].COVER})`}}>
                            <div className = 'cardsection1-leftcard-content' >
                                <label className = 'cardsection1-card-date'>{data[0].RELEASEDATE.split('-')[0]}</label>
                                <label>{data[0].TITLE}</label>
                            </div>
                        </div>
                    </Link>
                    <div data-aos = {scrollAnimation[1]} className = 'cardsection1-rightcards-container'>
                        <div className = 'cardsection1-rightcards-content'>
                            {data.map((content, index) => {
                                if(index !== 0){
                                return (
                                <Link to = {`/content/${content.ID}`}>
                                    <div className = 'cardsection1-smallcard-container' 
                                    style = {{'background-image' : `LINEAR-GRADIENT(TO RIGHT top, RGB(0, 0, 0, 0.8) 5%, transparent 90%),
                                                                    url(${content.COVER})`}}>
                                            <div className = 'cardsection1-smallcard-content'>
                                                <label className = 'cardsection1-card-date'>{content.RELEASEDATE.split('-')[0]}</label>
                                                <label>{content.TITLE}</label>
                                            </div>
                                        </div>
                                 </Link>
                                )
                                }
                                return null;
                            })

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CardsSection1;