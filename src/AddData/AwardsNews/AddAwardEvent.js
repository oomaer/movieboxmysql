import React, {Component} from 'react';
import '../Content/addcontent.css';
import SearchBar from '../Content/SearchBar';
class AddAwardEvent extends Component {
    constructor(){
        super();
        this.state = {
            name : '',
            year: '',
            discription: '',
            image: '',
            content: {},
            statusMsg: '',
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onYearChange = (event) => {
        this.setState({year : event.target.value});
    }

    onImageChange = (event) => {
        this.setState({image: event.target.value});
    }

    onDiscriptionChange = (event) => {
        this.setState({discription: event.target.value});
    }

    setContent = (object) => {
        this.setState({content: object});
    }

    removeContent = () => {
        this.setContent({content: {}});
    }

    validData = () => {
        const {name, year, discription, image, content} = this.state;
        if(name === ''){
            this.setState({statusMsg: 'Name cannot be left empty'});
        }
        else if(year === ''){
            this.setState({statusMsg: 'Year cannot be left empty'});
        }
        else if(discription === ''){
            this.setState({statusMsg: 'Discription is required'});
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

    addAwardEvent = () => {
        if(this.validData()){
            fetch('http://localhost:4000/addAwardEvent', {
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
                                    year: '',
                                    discription: '',
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
        const {name, year, discription, image, content, statusMsg} = this.state;
        return(
            <div className = 'add-content-container'>
                <div className = 'add-content-main'>
                    <h1>Add Awards/Events</h1>
                    <div className = 'add-content-inputs'>
                        <label>Name</label>
                        <input value = {name} maxLength = '100' onChange = {this.onNameChange}></input>
                        
                        <label>Year</label>
                        <input value = {year} type = 'number' onChange = {this.onYearChange}></input>
  
                        <label>Discription</label>
                        <textarea maxLength = '1000' id = 'movie-overview' value ={discription} onChange ={this.onDiscriptionChange}></textarea>
                        
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

                        <button className= 'add-content-btn' onClick = {this.addAwardEvent}>ADD</button>
                        <label style = {{'pointerEvents' : 'none'}} id = 'add-content-status-msg'>{statusMsg}</label>

                    </div>
                    
                </div>
            </div>
        )   

    }
}

export default AddAwardEvent;