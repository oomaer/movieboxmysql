import React, {useState, useEffect} from 'react';
import './cover.css';
import {useSwipeable} from 'react-swipeable';
import {Link} from 'react-router-dom';
import LoadingScreen from '../LoadingScreen';

const Cover = () => {

    const [data, setData] = useState([[]]);
    const [currentIndex, setCurrentIndex]  = useState(0);
    const [animation_class, setAnimationClass] = useState('');
    const [loading, setLoading] = useState(true);
    
    const handlers = useSwipeable({
        onSwipedLeft: () => changeCover(currentIndex + 1),
        onSwipedRight: () => changeCover(currentIndex - 1),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    useEffect(() => {
        fetch('https://moviebox-demo-webapp.herokuapp.com/getrecommended')
            .then(response => response.json()
                .then(result => {
                    setData(result);
                    setLoading(false);
            }))
            .catch(err => console.log(err)); 
    }, []);

        // this.interval = setInterval(() => this.setState({currentIndex : (this.state.currentIndex+1) % 6}), 6000);
        

    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

    const changeCover = (index) => {
        index = index % 6;
        if(index === -1){
            index = 5;
        }
        if(index > currentIndex){
            setAnimationClass('animate__slideInRight');
        }
        else{
            setAnimationClass('animate__slideInLeft');
        }
        setCurrentIndex(index);
    }

    const backgroundimage = {'background-image': `url(${data[currentIndex].COVER})`};

    if (loading){
        return (<LoadingScreen />)
    }
    else{
        return(
            <div className = 'cover-page'>
            <div key = {currentIndex} id = 'the-main-cover' {...handlers}
            className = {`cover-container animate__animated animate__faster ${animation_class}`} style = {backgroundimage}>
                
                <div className = 'cover-content' >
                    <Link className = 'link' to = {`/content/${data[currentIndex].ID}`}>
                    <div className = 'content-details'> 
                        <div className = 'small-details'>
                            {data[currentIndex].RELEASEDATE ? (
                            <label>{data[currentIndex].RELEASEDATE.split('-')[0]} </label>):(null)}
                            <label id = 'cover-genres'> | {data[currentIndex].GENRES}</label>
                            <label> | {data[currentIndex].RUNTIME + ' minutes'}</label>
                        </div>
                        
                            <h1>{data[currentIndex].TITLE}</h1>
                    </div>
                    </Link>
                </div>

            </div>
            <div className = 'covers-list'>
        
                        {data.map((value, index) => {
                            return (
                                currentIndex === index ? (
                                    <div className = 'cover-card active-cover'>
                                        <img src = {data[index].IMAGE} alt = 'covers'></img>
                                    </div>
                                )
                                :
                                (
                                    <div className = 'cover-card' onClick = {() => changeCover(index)}>
                                        <img src = {data[index].IMAGE} alt = 'covers'></img>
                                    </div>
                                )                             
                            )
                        })}
                        
                </div>
            
            </div>     
        )

    }

}

export default Cover;