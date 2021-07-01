import React, {Component} from 'react';
import '../Content/addcontent.css';
import SearchBar from '../Content/SearchBar';
class AddNews extends Component {
    constructor(){
        super();
        this.state = {
            name : '',
            discription: '',
            publishDate : '',
            popularity: '',
            image: '',
            content: {},
            statusMsg: '',
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onDateChange = (event) => {
        this.setState({publishDate : event.target.value});
    }

    onImageChange = (event) => {
        this.setState({image: event.target.value});
    }

    onDiscriptionChange = (event) => {
        this.setState({discription: event.target.value});
    }

    onPopularityChange = (event) => {
        this.setState({popularity: event.target.value});
    }

    setContent = (object) => {
        this.setState({content: object});
    }

    removeContent = () => {
        this.setContent({content: {}});
    }

    validData = () => {
        const {name, discription, publishDate, popularity, image, content} = this.state;
        if(name === ''){
            this.setState({statusMsg: 'Name cannot be left empty'});
        }
        else if(discription === ''){
            this.setState({statusMsg: 'Discription is required'});
        }
        else if(publishDate === ''){
            this.setState({statusMsg: 'Publish Date is required'});
        }
        else if(popularity === ''){
            this.setState({statusMsg: 'Popularity is required'});
        }
        else if(image === ''){
            this.setState({statusMsg: 'Image link is required'});
        }
        else if(content.ID === undefined){
            this.setState({statusMsg: 'Please Specify Content'});
        }
        else{
            this.setState({statusMsg: ''})
            return true;
        }
        return false;
    }

    addNews = () => {
        if(this.validData()){
            fetch('http://localhost:4000/addNews', {
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
                    this.setState({statusMsg: 'Added Successfully',
                                    name : '',
                                    discription: '',
                                    publishDate : '',
                                    popularity: '',
                                    image: '',
                                    content: {},
                    });
                }
            
            })
            .catch(err => { 
                this.setState({statusMsg: 'Error Connecting to Server'})
            });

            }
    }


    render(){
        const {name, discription, publishDate, popularity, image, content, statusMsg} = this.state;
        return(
            <div className = 'add-content-container'>
                <div className = 'add-content-main'>
                    <h1>Add News</h1>
                    <div className = 'add-content-inputs'>
                        <label>Name</label>
                        <input value = {name} maxLength = '100' onChange = {this.onNameChange}></input>
                        
                        <label>Discription</label>
                        <textarea maxLength = '1000' id = 'movie-overview' value ={discription} onChange ={this.onDiscriptionChange}></textarea>
                        
                        <label>Publish Date</label>
                        <input value = {publishDate} type = 'date' onChange = {this.onDateChange}></input>
                        
                        <label>Popularity</label>
                        <input value = {popularity} type = 'number' onChange = {this.onPopularityChange}></input>
  
                        <label>Image Link</label>
                        <input type = 'url' maxLength = '500' value = {image} onChange = {this.onImageChange}></input>
                        
                        <label>Content</label>
                        <SearchBar type = 'AwardsNews' addItem = {this.setContent} />
                        {content.TITLE === undefined ? (null): (
                        <div style = {{'margin-top' : '1rem'}} className = 'added-element-card'>
                            <label className = 'added-element-card-name'>{`${content.TITLE}`}</label>
                            <label onClick = {this.removeContent} className = 'added-element-card-cross'>x</label>
                        </div>
                        )}

                        <button className= 'add-content-btn' onClick = {this.addNews}>ADD</button>
                        <label style = {{'pointerEvents' : 'none'}} id = 'add-content-status-msg'>{statusMsg}</label>

                    </div>
                    
                </div>
            </div>
        )   

    }
}

export default AddNews;