
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import './cardssection1.css';
import './cardssection2.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

const CardsSection3 = () => {

    const [data, setData] = useState([{COVER:'', RELEASEDATE: ''}]);

    useEffect(() => {
        fetch('https://moviebox-demo-webapp.herokuapp.com/filterCelebrity', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    type: 'celebrity',
                    filter: 'popularity',
                    rows: 6
                })
            }).then(response => {
                if(!response.ok){  
                    console.log('error fetching data') 
                }
                else{
                    response.json().then(result => {
                        console.log(result)
                        setData(result)
                    })
                }
            
            })
            .catch(err => {
                this.setState({statusMsg: 'Error Connecting to Server'})
            });
            Aos.init();
    }, []); 

    return(
        <div className = 'cardsection2-container'>
            <div className = 'cardsection1-content'>
                <div className = 'cardsection1-header'>
                    <h2>Popular Celebrities</h2>
                    <label></label>
                </div>
                <div data-aos = 'flip-up' data-aos-duration = '800' className = 'cardsection2-cards-container'>
                    <div className = 'cardsection2-firsthalf-cards'>
                        {data.map((item, index) => {
                            if(index < data.length / 2){
                            return (
                            <Link to = {`/celebrity/${item.ID}`}>
                                <div className = ''></div>
                                <div className = 'cardsection2-card-container' 
                                style = {{'background-image' : `LINEAR-GRADIENT(TO RIGHT top, RGB(0, 0, 0, 0.8) 5%, transparent 90%),
                                                                url(${item.IMAGE})`}}>
                                        <div className = 'cardsection1-smallcard-content'>
                                            <label className = 'cardsection1-card-date'>{item.BIRTHDATE}</label>
                                            <label>{item.NAME}</label>
                                        </div>
                                    </div>
                                </Link>
                            )
                            }
                            return null;
                        })}

                    </div>
                    <div className = 'cardsection2-secondhalf-cards'>
                        {data.map((item, index) => {
                            if(index >= data.length / 2){
                            return (
                            <Link to = {`/celebrity/${item.ID}`}>
                                <div className = ''></div>
                                <div className = 'cardsection2-card-container' 
                                style = {{'background-image' : `LINEAR-GRADIENT(TO RIGHT top, RGB(0, 0, 0, 0.8) 5%, transparent 90%),
                                                                url(${item.IMAGE})`}}>
                                        <div className = 'cardsection1-smallcard-content'>
                                            <label className = 'cardsection1-card-date'>{item.BIRTHDATE}</label>
                                            <label>{item.NAME}</label>
                                        </div>
                                    </div>
                                </Link>
                            )
                            }
                            return null;
                        })}

                    </div>
                </div>

            </div>  
        </div>
    )

}

export default CardsSection3;