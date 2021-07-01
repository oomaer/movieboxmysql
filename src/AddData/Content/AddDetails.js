import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AddCast from './AddCast';
import AddCrew from './AddCrew';
import AddElements from './AddElements';
import AddTVDetails from './AddTVDetails';
import './adddetails.css';

class AddDetails extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            content_id : this.props.match.params.contentid,
            added_cast: [],
            added_crew: [],
            added_genres: [],
            added_languages: [],
            added_productionCo: [],
            added_locations: [],
            added_plotKeywords: [],
            added_pictures: [],
            added_seasons: [],
            added_creators: [],
            content: {},

        }
    }
    
    componentDidMount(){
        fetch('http://localhost:4000/getContentDetails', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                content_id : this.state.content_id
            }
            )
        }).then(response => {
            if(!response.ok){
                console.log('error getting content data');
            }
            else{
                response.json().then(result => {
                    this.setState({
                        content: result.content,
                        added_cast: result.cast,
                        added_crew: result.crew,
                        added_genres: result.genres,
                        added_languages: result.languages,
                        added_locations: result.locations,
                        added_productionCo: result.production_co,
                        added_plotKeywords: result.plot_keywords,
                        added_pictures: result.pictures,
                        
                    })
                    if(result.content.TYPE === 'tvshow'){
                        this.setState({           
                            added_seasons: result.seasons,
                            added_creators: result.creators})
                    }
                })
            }
        
        })
        .catch(err => {
            console.log('error getting content data');
        }); 
    }

    containsObject = (type, object) => {
        let array;
        switch(type){
            case 'Cast Members':
                array = this.state.added_cast;
                break;
            case 'Crew Members':
                array = this.state.added_crew;
                break;
            case 'Genres':
                array = this.state.added_genres;
                break;
            case 'Languages':
                array = this.state.added_languages;
                break;
            case 'Production Companies':
                array = this.state.added_productionCo;
                break;
            case 'Plot Keywords':
                array = this.state.added_plotKeywords;
                break;
            case 'Filming Locations':
                array = this.state.added_locations;
                break;
            case 'Pictures':
                array = this.state.added_pictures;
                break;
            default:
        }
        if(type === 'Cast Members'){
            for(let i = 0; i < array.length; i++){
                if(array[i].ID === object.ID){
                    return true;
                }
            }
        }
        else if(type === 'Crew Members'){
            for(let i = 0; i < array.length; i++){
                if(array[i].NAME === object.NAME && array[i].ROLE === object.ROLE){
                    return true;
                }
            }
        }
        else{
            for(let i = 0; i < array.length; i++){
                if(array[i].NAME === object){
                    return true;
                }
            }
        }
        return false;
    }

    addPerson = (type, member) => {
        if(!(this.containsObject(type, member))){
            if(type === 'Cast Members'){
                let cast_arr = this.state.added_cast;
                cast_arr.push(member);
                this.setState({added_cast: cast_arr});
            }
            else if(type === 'Crew Members'){
                let crew_arr = this.state.added_crew;
                crew_arr.push(member);
                this.setState({added_crew: crew_arr});
            }
            
            fetch('http://localhost:4000/addPersonLink', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    member: member,
                    content_id: this.state.content_id,
                    type: type,
                    
                }
                )
            }).then(response => {
                if(!response.ok){
                    console.log('error adding cast/crew in database');
                }
                else{
                    response.json().then(result => {
                        console.log(result);
                    })
                }
            
            })
            .catch(err => {
                console.log('error adding cast/crew in database');
            }); 
        }
    }

    removePerson = (type, index, member) => {
        if(type === 'Cast Members'){
            let cast_arr = this.state.added_cast;
            cast_arr.splice(index, 1);
            this.setState({added_cast: cast_arr});
        }
        else if(type === 'Crew Members'){
            let crew_arr = this.state.added_crew;
            crew_arr.splice(index, 1);
            this.setState({added_crew: crew_arr});           
        }
        fetch('http://localhost:4000/removePersonLink', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                member: member,
                content_id: this.state.content_id,
                type: type
            }
            )
        }).then(response => {
            if(!response.ok){
                console.log('error removing cast/crew');
            }
            else{
                response.json().then(result => {
                    console.log(result);
                })
            }
        
        })
        .catch(err => {
            console.log('error removing cast/crew');
        });
    }

    AddElement = (element, type) => {
        if(!(this.containsObject(type, element))){
            let temparr;
            switch(type){
                case 'Genres':
                    temparr = this.state.added_genres;
                    temparr.push({NAME: element});
                    this.setState({added_genres: temparr});
                    break;
                case 'Production Companies':
                    temparr = this.state.added_productionCo;
                    temparr.push({NAME: element});
                    this.setState({added_productionCo: temparr});
                    break;
                case 'Languages':
                    temparr = this.state.added_languages;
                    temparr.push({NAME: element});
                    this.setState({added_languages: temparr});
                    break;
                case 'Filming Locations':
                    temparr = this.state.added_locations;
                    temparr.push({NAME: element});
                    this.setState({added_locations: temparr});
                    break;
                case 'Plot Keywords':
                    temparr = this.state.added_plotKeywords;
                    temparr.push({NAME: element});
                    this.setState({added_plotKeywords: temparr});
                    break;
                case 'Pictures':
                    temparr = this.state.added_pictures;
                    temparr.push({LINK: element});
                    this.setState({added_pictures: temparr});
                    break;
                default:
            }
            fetch('http://localhost:4000/addElement', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    value: element,
                    content_id: this.state.content_id,
                    type: type
                }
                )
                }).then(response => {
                    if(!response.ok){
                        console.log('error adding element');
                    }
                    else{
                        response.json().then(result => {
                            console.log(result);
                        })
                    }
                
                })
                .catch(err => {
                    console.log('error adding element');
                });    
        }
    }

    RemoveElement = (element, index, type) => {
        let temparr;
        switch(type){
            case 'Genres':
                temparr = this.state.added_genres;
                temparr.splice(index, 1);
                this.setState({added_genres: temparr});
                break;
            case 'Production Companies':
                temparr = this.state.added_productionCo;
                temparr.splice(index, 1);
                this.setState({added_productionCo: temparr});
                break;
            case 'Languages':
                temparr = this.state.added_languages;
                temparr.splice(index, 1);
                this.setState({added_languages: temparr});
                break;
            case 'Filming Locations':
                temparr = this.state.added_locations;
                temparr.splice(index, 1);
                this.setState({added_locations: temparr});
                break;
            case 'Plot Keywords':
                temparr = this.state.added_plotKeywords;
                temparr.splice(index, 1);
                this.setState({added_plotKeywords: temparr});
                break;
            case 'Pictures':
                temparr = this.state.added_pictures;
                temparr.splice(index, 1);
                this.setState({added_pictures: temparr});
                break;
            default:
        }
        fetch('http://localhost:4000/removeElement', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                object: element,
                content_id: this.state.content_id,
                type: type
            }
            )
            }).then(response => {
                if(!response.ok){
                    console.log('error deleting element');
                }
                else{
                    response.json().then(result => {
                        console.log(result);
                    })
                }
            
            })
            .catch(err => {
                console.log('error deleting element');
            });    
    }

    TVDetailalreadyAdded = (object, type) => {
        if(type === 'Seasons'){
            for(let i = 0; i < this.state.added_seasons.length; i++){
                if(this.state.added_seasons[i].SEASON_NO === object.SEASON_NO){
                    return true;
                }
            }
        }
        else if(type === 'Creators'){
            for(let i = 0; i < this.state.added_creators.length; i++){
                if(this.state.added_creators[i].NAME === object.NAME){
                    return true;
                }
            }
        }
        return false;
    }

    AddTVDetail = (object, type) => {
        if(!(this.TVDetailalreadyAdded(object, type))){
            let temparr;
            if(type === 'Seasons'){
                temparr = this.state.added_seasons;
                temparr.push(object);
                this.setState({added_seasons: temparr});
            }
            else if(type === 'Creators'){
                temparr = this.state.added_creators;
                temparr.push(object);
                this.setState({added_creators: temparr});
            }
            fetch('http://localhost:4000/addTVDetail', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                object: object,
                content_id: this.state.content_id,
                type: type
            }
            )
            }).then(response => {
                if(!response.ok){
                    console.log('error deleting element');
                }
                else{
                    response.json().then(result => {
                        console.log(result);
                    })
                }
            
            })
            .catch(err => {
                console.log('error deleting element');
            });  
        }
        
    }

    removeTVDetail = (item, index, type) => {
        let temparr;
        if(type === 'Seasons'){
            temparr = this.state.added_seasons;
            temparr.splice(index, 1);
            this.setState({added_seasons: temparr});
        }
        else if(type === 'Creators'){
            temparr = this.state.added_creators;
            temparr.splice(index, 1);
            this.setState({added_creators: temparr});
        }
        fetch('http://localhost:4000/removeTVDetail', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                object: item,
                content_id: this.state.content_id,
                type: type
            }
            )
            }).then(response => {
                if(!response.ok){
                    console.log('error deleting element');
                }
                else{
                    response.json().then(result => {
                        console.log(result);
                    })
                }
            
            })
            .catch(err => {
                console.log('error deleting element');
            });  
    }

    render(){
        const {added_cast, added_crew, added_genres, added_languages, added_locations, added_pictures, added_plotKeywords, added_productionCo, added_seasons, added_creators, content} = this.state;
        return(
            <div className = 'add-content-details-container'>
                {content === undefined ? (<h1>404 not found</h1>)
                :(<div className = 'add-content-details-main'>
                    <div className = 'add-content-details-content-header'><h1>{content.TITLE}</h1><label>({content.TYPE})</label><label>{content.RELEASEDATE}</label></div>
                    <AddCast type = 'Cast Members' added_arr = {added_cast} addItem = {this.addPerson} removeItem = {this.removePerson}/>
                    <AddCrew type = 'Crew Members' added_arr = {added_crew} addItem = {this.addPerson} removeItem = {this.removePerson}/>
                    <AddElements type = 'Genres' added_arr = {added_genres} AddElement = {this.AddElement} removeElement = {this.RemoveElement}/>
                    <AddElements type = 'Languages' added_arr = {added_languages} AddElement = {this.AddElement} removeElement = {this.RemoveElement}/>
                    <AddElements type = 'Filming Locations' added_arr = {added_locations} AddElement = {this.AddElement} removeElement = {this.RemoveElement}/>
                    <AddElements type = 'Production Companies' added_arr = {added_productionCo} AddElement = {this.AddElement} removeElement = {this.RemoveElement}/>
                    <AddElements type = 'Plot Keywords' added_arr = {added_plotKeywords} AddElement = {this.AddElement} removeElement = {this.RemoveElement}/>
                    <AddElements type = 'Pictures' added_arr = {added_pictures} AddElement = {this.AddElement} removeElement = {this.RemoveElement}/>
                    {content.TYPE === 'movie' ? 
                    (
                        <div className = 'add-movie-details'>
                            
                        </div>
                    )
                    :(
                        <div className = 'add-tv-details'>
                            <AddTVDetails type = 'Seasons' added_arr = {added_seasons} addItem = {this.AddTVDetail} removeItem = {this.removeTVDetail}/>
                            <AddTVDetails type = 'Creators' added_arr = {added_creators} addItem = {this.AddTVDetail} removeItem = {this.removeTVDetail}/>
                        </div>
                    )
                    }
                </div> 
                )}
            </div>
        )
    }
}

export default withRouter(AddDetails);