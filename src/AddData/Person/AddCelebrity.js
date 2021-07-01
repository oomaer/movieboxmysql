import React, {Component} from 'react';
import '../Content/addcontent.css';
import AddElements from '../Content/AddElements';

class AddCelebrity extends Component {
    constructor(){
        super();
        this.state = {
            added_id: '',
            name : '',
            gender: '',
            department: '',
            popularity: '',
            birthdate: '',
            biography: '',
            image: '',
            added_pictures: [],
            statusMsg: '',
        }
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

    addCelebrity = () => {
        if(this.validData()){
            fetch('http://localhost:4000/addCelebrity', {
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
                    gender: '',
                    department: '',
                    popularity: '',
                    birthdate: '',
                    biography: '',
                    image: ''
                    });
                    response.json().then(result => {
                        this.setState({added_id: result});
                    })
                }
            
            })
            .catch(err => {
                this.setState({statusMsg: 'Error Connecting to Server'})
            });

            }
    }
    
    validPictureLink = (array, object) => {
        console.log(array);
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
                    celeb_id: this.state.added_id,
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
    
    removePicture = (element, index, type) => {
        console.log(element);
        let temparr = this.state.added_pictures;
        temparr.splice(index, 1);
        this.setState({added_pictures: temparr});
        fetch('http://localhost:4000/removeCelebrityPicture', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                value: element.LINK,
                celeb_id: this.state.added_id,
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
        const {added_id, name, department, gender, popularity, birthdate, biography, image, added_pictures, statusMsg} = this.state;
        return(
            <div className = 'add-content-container'>
                <div className = 'add-content-main'>
                    <h1>Add Celebrity</h1>
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
                        
                        <button className= 'add-content-btn' onClick = {this.addCelebrity}>ADD</button>
                        <label id = 'add-content-status-msg'>{statusMsg}</label>

                        {added_id !== '' ? 
                        (
                            <AddElements type = 'Pictures' added_arr = {added_pictures} AddElement = {this.AddPicture} removeElement = {this.removePicture}/>
                        ):(null)
                        }
                    </div>
                    
                </div>
            </div>
        )   

    }
}

export default AddCelebrity;