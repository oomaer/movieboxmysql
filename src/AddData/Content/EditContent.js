import React, {Component} from 'react';
import './addcontent.css';
import {Link, withRouter, Redirect} from 'react-router-dom';

class EditContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            content_id : this.props.match.params.contentid,
            content_found: true,
            title: '',
            releaseDate: '',
            runtime: '',
            tagline: '',
            voteAvg: '',
            voteCount: '',
            popularity: '',
            overview : '',
            trailer: '',
            image: '',
            cover: '',
            type: '',
            movie: {
                budget: '',
                revenue: ''
            },
            tvshow:{
                episodes: '',
                seasons: ''
            },
            statusMsg: '',
            redirect: false
        }
    }

    componentDidMount(){
        fetch('http://localhost:4000/getContentData', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    id : this.state.content_id
                })
            }).then(response => {
                if(!response.ok){  
                    this.setState({content_found: false});  
                }
                else{
                    response.json().then(result => {
                        this.setState({
                            title: result.TITLE,
                            releaseDate: result.RELEASEDATE,
                            runtime: result.RUNTIME,
                            tagline: result.TAGLINE,
                            voteAvg: result.VOTEAVG,
                            voteCount: result.VOTECOUNT,
                            popularity: result.POPULARITY,
                            overview: result.OVERVIEW,
                            trailer: result.TRAILER,
                            image: result.IMAGE,
                            cover: result.COVER,
                            type: result.TYPE
                        })
                        if(result.TYPE === 'movie'){
                            this.setState(Object.assign(this.state.movie, {
                                budget: result.movie.BUDGET,
                                revenue: result.movie.REVENUE
                            }))
                        }
                        else if(result.TYPE === 'tvshow'){
                            this.setState(Object.assign(this.state.tvshow, {
                                seasons: result.tv_show.SEASONS,
                                episodes: result.tv_show.EPISODES
                            }))
                        }
                    })
                }
            
            })
            .catch(err => {
                this.setState({statusMsg: 'Error Connecting to Server'})
            });
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

    confirmEdit = () => {
        if(this.validData()){
            fetch('http://localhost:4000/editContentData', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify(
                    this.state
                )
            }).then(response => {
                if(!response.ok){
                    this.setState({statusMsg : 'Error Editing data'});    
                }
                else{
                    response.json().then(result => {
                        this.setState({statusMsg: 'Edited Successfully'});
                    })
                }
            
            })
            .catch(err => {
                this.setState({statusMsg: 'Error Connecting to Server'})
            });

        }
    }

    confirmDelete = () => {
        fetch('http://localhost:4000/deleteContentData', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify(
                {id: this.state.content_id}
            )
        }).then(response => {
            if(!response.ok){
                this.setState({statusMsg : 'Error deleting data'});    
            }
            else{
                response.json().then(result => {
                    this.setState({redirect: true});
                })
            }
        
        })
        .catch(err => {
            this.setState({statusMsg: 'Error Connecting to Server'})
        });

    }
 

    render(){

        const {content_found, content_id, title, releaseDate, runtime, tagline, voteAvg, voteCount, popularity, overview, trailer, image, cover, type, movie, tvshow, statusMsg, redirect} = this.state;
        return(
            <div className = 'add-content-container'>
                {redirect ? (<Redirect to="/"/>) : null }
                {!content_found ? (<h1>404 not found</h1>)
                :(
                <div className = 'add-content-main'>
                    <h1>Edit Content</h1>
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
                        <textarea maxLength = '1000' value = {overview} id = 'overview-textarea' onChange ={this.onOverViewChange}></textarea>

                        <label>Trailer Link</label>
                        <input type = 'url' maxLength = '500' value = {trailer} onChange = {this.onTrailerChange}></input>

                        <label>Image Link</label>
                        <input type = 'url' maxLength = '500' value = {image} onChange = {this.onImageChange}></input>
                        
                        <label>Cover Photo Link</label>
                        <input type = 'url' maxLength = '500' value = {cover} onChange = {this.onCoverChange}></input>
                        
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
                            <div className = 'edit-and-delete-content-btns'>
                                <button className= 'add-content-btn' onClick = {this.confirmEdit}>Confirm</button>
                                <button className= 'add-content-btn' onClick = {this.confirmDelete}>Delete</button>
                            </div>
                            <label id = 'add-content-status-msg'>{statusMsg}</label>
                            <Link to = {`/admin/${content_id}/details`}><label id = 'addmoredetailsbtn'>edit details</label></Link>
                    </div>
                    
                </div>
                )}
            </div>
            
        )   


    }
}

export default withRouter(EditContent);