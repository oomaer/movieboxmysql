import React, {Component} from 'react';
import './addcontent.css';
import {Link} from 'react-router-dom';

class AddContent extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            releaseDate: '',
            runtime: '',
            tagline: '',
            voteAvg: '',
            voteCount: '',
            popularity: '',
            overview: '',
            trailer: '',
            image: '',
            cover: '',
            type: 'movie',
            movie: {
                budget: '',
                revenue: ''
            },
            tvshow:{
                episodes: '',
                seasons: ''
            },
            statusMsg: '',
            added_id: ''
        }
    }

    onTitleChange = (event) => {
        this.setState({title: event.target.value});
    }

    onReleaseDateChange = (event) => {
        this.setState({releaseDate: event.target.value});
    }

    onRuntimeChange = (event) => {
        if(!(event.target.value > 2147483646)){
            this.setState({runtime: event.target.value});
        }
    }

    onTaglineChange = (event) => {
        this.setState({tagline: event.target.value});
    }

    onVoteAvgChange = (event) => {
        if(!(event.target.value > 10)){
            this.setState({voteAvg: event.target.value});
        }
    }

    onVoteCountChange = (event) => {
        if(!(event.target.value > 2147483646)){
            this.setState({voteCount: event.target.value});
        }
    }

    onPopularityChange = (event) => {
        if(!(event.target.value > 100)){
            this.setState({popularity: event.target.value});
        }
    }

    onTrailerChange = (event) => {
        this.setState({trailer: event.target.value});
    }

    onImageChange = (event) => {
        this.setState({image: event.target.value});
    }

    onCoverChange = (event) => {
        this.setState({cover: event.target.value});
    }

    onOverViewChange = (event) => {
        this.setState({overview: event.target.value});
    }

    onSeasonChange = (event) => {
        if(!(event.target.value > 1000)){
            this.setState(Object.assign(this.state.tvshow, {seasons: event.target.value}));
        }
    }

    onEpisodesChange = (event) => {
        if(!(event.target.value > 50000)){
            this.setState(Object.assign(this.state.tvshow, {episodes: event.target.value}));
        }
    }

    onBudgetChange = (event) => {
        if(!(event.target.value > 2147483646)){
            this.setState(Object.assign(this.state.movie, {budget: event.target.value}));
        }
    }

    onRevenueChange = (event) => {
        if(!(event.target.value > 2147483646)){
            this.setState(Object.assign(this.state.movie, {revenue: event.target.value}));
        }
    }

    validData = () => {
        const {title, releaseDate, runtime, image, cover, type, movie} = this.state;
        if(title === ''){
            this.setState({statusMsg: 'Title cannot be left empty'});
        }
        else if(releaseDate === ''){
            this.setState({statusMsg: 'Release Date cannot be left empty'});
        }
        else if(runtime === ''){
            this.setState({statusMsg: 'Runtime cannot be left empty'});
        }
        else if(image === ''){
            this.setState({statusMsg: 'Image link is required'});
        }
        else if(cover === ''){
            this.setState({statusMsg: 'Cover Photo link is required'});
        }
        else if(type === 'movie' && movie.budget === ''){
            this.setState({statusMsg: 'Budget is required'});
        }
        else if(type === 'movie' && movie.revenue === ''){
            this.setState({statusMsg: 'Revenue is required'});
        }
        else{
            this.setState({statusMsg: ''})
            return true;
        }
        return false;
    }

    addContent = () => {
        if(this.validData()){
            fetch('http://localhost:4000/addContent', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify(
                    this.state
                )
            }).then(response => {
                if(!response.ok){
                    this.setState({statusMsg : 'Error Adding data'});    
                }
                else{
                    response.json().then(result => {
                        this.setState({statusMsg: 'Added Successfully', added_id: result,
                        title: '',
                        releaseDate: '',
                        runtime: '',
                        tagline: '',
                        voteAvg: '',
                        voteCount: '',
                        popularity: '',
                        overview: '',
                        trailer : '',
                        image: '',
                        cover: '',
                        type: 'movie',
                        movie: {
                            budget: '',
                            revenue: ''
                        },
                        tvshow:{
                            episodes: '',
                            seasons: ''
                        },
                    });
                    })
                }
            
            })
            .catch(err => {
                this.setState({statusMsg: 'Error Connecting to Server'})
            });

            }
    }
 

    render(){
        const {title, releaseDate, runtime, tagline, voteAvg, voteCount, popularity, overview, trailer, image, cover, type, movie, tvshow, statusMsg, added_id} = this.state;
        return(
            <div className = 'add-content-container'>
                <div className = 'add-content-main'>
                    <h1>Add Content</h1>
                    <div className = 'add-content-inputs'>
                        <label>Title</label>
                        <input value = {title} maxLength = '55' onChange = {this.onTitleChange}></input>
                        
                        <label>Release Date</label>
                        <input type = 'date' maxLength = '10' value = {releaseDate} onChange = {this.onReleaseDateChange}></input>
                        
                        <label>Runtime</label>
                        <input type = 'number' value = {runtime} onChange = {this.onRuntimeChange}></input>
                        
                        <label>Tag Line</label>
                        <input value = {tagline} maxLength = '320' onChange = {this.onTaglineChange}></input>
                        
                        <label>Average Vote</label>
                        <input type = 'number' value = {voteAvg} onChange = {this.onVoteAvgChange}></input>
                        
                        <label>Total Votes</label>
                        <input type = 'number' value = {voteCount} onChange = {this.onVoteCountChange}></input>
                        
                        <label>Popularity</label>
                        <input type = 'number' value = {popularity} onChange = {this.onPopularityChange}></input>
                        
                        <label>Overview</label>
                        <textarea maxLength = '1000' id = 'overview-textarea' onChange ={this.onOverViewChange} value = {overview}></textarea>

                        <label>Trailer Link</label>
                        <input type = 'url' maxLength = '500' value = {trailer} onChange = {this.onTrailerChange}></input>

                        <label>Image Link</label>
                        <input type = 'url' maxLength = '500' value = {image} onChange = {this.onImageChange}></input>
                        
                        <label>Cover Photo Link</label>
                        <input type = 'url' maxLength = '500' value = {cover} onChange = {this.onCoverChange}></input>
                        
                        <label>Type</label>
                        <select value = {type} onChange = {(event) => this.setState({type: event.target.value})}>
                            <option>movie</option>
                            <option>tvshow</option>
                        </select>

                            {type === 'movie' ? 
                            (   <div className = 'add-movie-details'>
                                    <label>Budget: </label>
                                    <input type = 'number' onChange = {this.onBudgetChange} value = {movie.budget}></input>
                                    <label>Revenue:</label>
                                    <input type = 'number' onChange = {this.onRevenueChange} value = {movie.revenue}></input>
                                </div>
                            ):(
                                <div className = 'add-tvshow-details'>
                                    <label>Number of Seasons</label>
                                    <input type = 'number' value = {tvshow.seasons} onChange = {this.onSeasonChange}></input>
                                    <label>Number of Episodes in a Season</label>
                                    <input type = 'number' value = {tvshow.episodes} onChange = {this.onEpisodesChange}></input>
                                </div>
                            )
                            }
                            <button className= 'add-content-btn' onClick = {this.addContent}>ADD</button>
                            <label id = 'add-content-status-msg'>{statusMsg}</label>
                            {added_id === '' ? (<div></div>):
                            (<Link to = {`${this.props.url}/${added_id}/details`}><label id = 'addmoredetailsbtn'>add more details</label></Link>)}
                    </div>
                    
                </div>
            </div>
        )   


    }
}

export default AddContent;