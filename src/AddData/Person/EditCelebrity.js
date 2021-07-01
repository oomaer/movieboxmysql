import React, {Component} from 'react';
import '../Content/addcontent.css';
import {withRouter, Redirect} from 'react-router-dom';
import AddElements from '../Content/AddElements';

class EditCelebrity extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.personid,
            name : '',
            gender: '',
            department: '',
            popularity: '',
            birthdate: '',
            biography: '',
            image: '',
            added_pictures: [],
            statusMsg: '',
            redirect: false,
            found: true
        }
    }

    componentDidMount(){
        fetch('http://localhost:4000/getCelebrity', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify(
                    {id: this.state.id}
                )
            }).then(response => {
                if(!response.ok){
                    this.setState({found: false});    
                }
                else{
                    response.json().then(result => {
                        this.setState({
                            name : result.NAME,
                            gender: result.GENDER,
                            department: result.DEPARTMENT,
                            popularity: result.POPULARITY,
                            birthdate: result.BIRTHDATE,
                            biography: result.BIOGRAPHY,
                            image: result.IMAGE,
                            added_pictures: result.added_pictures
                        });  
                    })
                }
            
            })
            .catch(err => {
                this.setState({statusMsg: 'Error Connecting to Server'})
            });


    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onDepartmentChange = (event) => {
        this.setState({department: event.target.value});
    }

    onPopularityChange = (event) => {
        if(!(event.target.value > 100)){
            this.setState({popularity: event.target.value});
        }
    }

    onImageChange = (event) => {
        this.setState({image: event.target.value});
    }

    onBiographyChange = (event) => {
        this.setState({biography: event.target.value});
    }

    onGenderChange = (event) => {
        this.setState({gender: event.target.value});
    }

    onBirthdateChange = (event) => {
        this.setState({birthdate: event.target.value});
    }



    validData = () => {
        const {name, department, birthdate, gender, image} = this.state;
        if(name === ''){
            this.setState({statusMsg: 'Name cannot be left empty'});
        }
        else if(department === ''){
            this.setState({statusMsg: 'Department cannot be left empty'});
        }
        else if(gender === ''){
            this.setState({statusMsg: 'Gender is required'});
        }
        else if(birthdate === ''){
            this.setState({statusMsg: 'Date of birth is required'});
        }
        else if(image === ''){
            this.setState({statusMsg: 'Image link is required'});
        }
        else{
            this.setState({statusMsg: ''})
            return true;
        }
        return false;
    }

    confirmChanges = () => {
        if(this.validData()){
            fetch('http://localhost:4000/editCelebrity', {
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
                    this.setState({statusMsg: 'Edited Successfully'});
                }
            
            })
            .catch(err => {
                this.setState({statusMsg: 'Error Connecting to Server'})
            });

            }
    }

    validPictureLink = (array, object) => {
   
        for(let i = 0; i < array.length; i++){
            if(array[i].NAME === object){
                return true;
            }
        }
    }

    AddPicture = (element, type) => {
        if(!(this.validPictureLink(this.state.added_pictures, element))){
            let temparr = this.state.added_pictures;
            temparr.push({LINK: element});
            this.setState({added_pictures: temparr});
            fetch('http://localhost:4000/addCelebrityPicture', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    value: element,
                    celeb_id: this.state.id,
                }
                )
                }).then(response => {
                    if(!response.ok){
                        console.log('error adding element');
                    }
                    else{
                        response.json().then(result => {
                            console.log(result);
                            this.setState({statusMsg: ''})
                        })
                    }
                
                })
                .catch(err => {
                    console.log('error adding element');
                });   
        }
    }
    
    removePicture = (element, index, type) => {
        let temparr = this.state.added_pictures;
        temparr.splice(index, 1);
        this.setState({added_pictures: temparr});
        fetch('http://localhost:4000/removeCelebrityPicture', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                value: element.LINK,
                celeb_id: this.state.id,
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

    confirmDelete = () => {
        fetch('http://localhost:4000/removeCelebrity', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify(
                {id: this.state.id}
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
        const {name, department, gender, popularity, birthdate, biography, image, added_pictures, statusMsg, redirect, found} = this.state;
        return(
            <div className = 'add-content-container'>
                {redirect ? (<Redirect to="/"/>) : null }
                {!found ? (<h1>404 not found</h1>)
                :(
                <div className = 'add-content-main'>
                    <h1>Edit Celebrity</h1>
                    <div className = 'add-content-inputs'>
                        <label>Name</label>
                        <input value = {name} maxLength = '55' onChange = {this.onNameChange}></input>
                        
                        <label>Department</label>
                        <input value = {department} maxLength = '32' onChange = {this.onDepartmentChange}></input>
                        
                        <label>Gender</label>
                        <input  maxLength = '15' value = {gender} onChange = {this.onGenderChange}></input>
                        
                        <label>Popularity</label>
                        <input type = 'number' value = {popularity} onChange = {this.onPopularityChange}></input>                    
                        
                        <label>Biography</label>
                        <textarea maxLength = '1500' id = 'overview-textarea' value ={biography} onChange ={this.onBiographyChange}></textarea>
                        
                        <label>Date of Birth: </label>
                        <input type = 'date' onChange = {this.onBirthdateChange} value = {birthdate}></input>
                        
                        <label>Image Link</label>
                        <input type = 'url' maxLength = '500' value = {image} onChange = {this.onImageChange}></input>

                        <AddElements type = 'Pictures' added_arr = {added_pictures} AddElement = {this.AddPicture} removeElement = {this.removePicture}/>
                       
                        <div className = 'edit-and-delete-content-btns'>
                            <button className= 'add-content-btn' onClick = {this.confirmChanges}>Confirm</button>
                            <button className= 'add-content-btn' onClick = {this.confirmDelete}>Delete</button>
                        </div>
                        <label id = 'add-content-status-msg'>{statusMsg}</label>
                    </div>
                    
                </div>
                )}
            </div>
        )   

    }
}

export default withRouter(EditCelebrity);