import {Route, useRouteMatch, Switch} from "react-router-dom"; 
import AddContent from './Content/AddContent';
import AddDetails from './Content/AddDetails';
import AddCelebrity from "./Person/AddCelebrity";
import EditContent from "./Content/EditContent";
import EditCelebrity from './Person/EditCelebrity';
import AddAwardEvent from "./AwardsNews/AddAwardEvent";
import AddNews from "./AwardsNews/AddNews"; 
import EditNews from './AwardsNews/EditNews';
import EditAwardEvent from './AwardsNews/EditAwardEvent';
const AddMain = ({admin}) => {
    let {path, url} = useRouteMatch();
    return(
      <div className = 'add-main'>
        {admin === false ? (<h1>404 Not Found</h1>)
        :(
        <Switch>
            <Route path = {`${path}/addcontent`}> 
                <AddContent url = {url}/>  
            </Route>
            <Route path = {`${path}/:contentid/details`}> 
                <AddDetails />
            </Route>
            <Route path = {`${path}/editcontent/:contentid`}> 
                <EditContent />
            </Route>
            <Route path = {`${path}/addcelebrity`}> 
                <AddCelebrity />
            </Route>
            <Route path = {`${path}/editcelebrity/:personid`}> 
                <EditCelebrity />
            </Route>
            <Route path = {`${path}/addawardevent`}> 
                <AddAwardEvent />
            </Route>
            <Route path = {`${path}/editawardevent/:id`}> 
                <EditAwardEvent />
            </Route>
            <Route path = {`${path}/addNews`}> 
                <AddNews />
            </Route>
            <Route path = {`${path}/editnews/:id`}> 
                <EditNews />
            </Route>
        </Switch>
        )}
       </div>
    )
}

export default AddMain;