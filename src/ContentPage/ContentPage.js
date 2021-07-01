import {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './contentpage.css';
import ContentPageCover from './ContentPageCover';
import ContentDetailsCard from './ContentDetailsCard';
class ContentPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            id : this.props.match.params.id,
            content: {RELEASEDATE: ''},
            details: {  
                        creators: [],
                        genres: [],
                        pictures: [],
                        cast: [],
                        crew: [],
                        plot_keywords : [],
                        languages: [],
                        locations: [],
                        production_co: [],
                        seasons: []},
            found: true
            
        }
    }

    componentDidMount(){
        this.getData(this.state.id);
    }

    getData = (id) => {
        fetch('http://localhost:4000/getContentData', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id : id
            })
        }).then(response => {
            if(!response.ok){  
                this.setState({found: false});  
            }
            else{
                response.json().then(result => {
                    this.setState({content: result})
                })
            }
        
        })
        .catch(err => {
            this.setState({statusMsg: 'Error Connecting to Server'})
        });

        
        fetch('http://localhost:4000/getContentDetails', {
            method: 'post',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                content_id : id
            })
        }).then(response => {
            if(!response.ok){  
                this.setState({found: false});  
            }
            else{
                response.json().then(result => {
                    this.setState({details: result})
                })
            }
        
        })
        .catch(err => {
            this.setState({statusMsg: 'Error Connecting to Server'})
        });
    }

    componentDidUpdate (prevProps) {
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.getData(this.props.match.params.id);
        }
    }


    render(){
        const {content, details, found} = this.state
        return(
            <div className = 'contentpage-container'>
                {found === false ? (<h1>404 Not Found</h1>)
                :(
                <div className = 'contentpage-content' id = {`content-page-content-${this.state.id}`}>
                    <ContentPageCover content = {content} details = {details} admin = {this.props.admin}/>
                    <ContentDetailsCard content = {content} details = {details}/>
                </div>
                )}
            </div>
        )
    }
}

export default withRouter(ContentPage);