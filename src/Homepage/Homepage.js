import React, {Component} from 'react';
import './homepage.css';
import Cover from './Cover';
import CardsSection1 from './CardsSection1';
import CardsSection2 from './CardsSection2';
import CardsSection3 from './CardsSection3';
class Homepage extends Component {

    render(){
        return(
            <div className = 'homepage-container'>
                <div className = 'homepage-content'>
                    <Cover />
                    <CardsSection1 filter = 'movie' classType = "type1"/>
                    <CardsSection2 />
                    <CardsSection1 filter = 'tvshow' classType = 'type2'/>
                    <CardsSection3 />
                </div>
            </div>
        )

    }

}

export default Homepage;