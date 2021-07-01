import React from 'react';
import {Route, useRouteMatch, Switch, Redirect} from "react-router-dom"; 
import ProfileSettings from './Profiling/ProfileSettings';
import Homepage from './Homepage/Homepage';
import ContentPage from './ContentPage/ContentPage';
import AdminPanel from './AddData/AdminPanel';
import FilterContent from './Filter/FilterContent';
import FilterCelebrity from './Filter/FilterCelebrity';
import NewsAwardsEvents from './NewsAwardsEvents/NewsAwardsEvents';
import CelebrityDetails from './Celebrity/CelebrityDetails';
import ContentReviews from './ContentPage/ContentReviews';
import ScrolltoTop from './ScrollToTop';
const Content = ({user, setUser}) => {
  let match = useRouteMatch();
    return(
      <div className = 'content'>
        <Switch>
          <Route exact path = {`/`}> 
            <Redirect to = '/home' />  
          </Route>          
          <Route exact path = {`${match.path}home`}>
            <ScrolltoTop/> 
            <Homepage />  
          </Route>
          <Route exact path = {`${match.path}content/:id`}> 
            <ScrolltoTop />
            <ContentPage admin = {user.admin}/>  
          </Route>
          <Route exact path = {`${match.path}content/:id/reviews`}> 
            <ScrolltoTop />
            <ContentReviews user = {user}/>  
          </Route>
          <Route exact path = {`${match.path}profile-settings`}>
            <ScrolltoTop />
            <ProfileSettings user = {user} setUser = {setUser} />
          </Route>
          <Route path = {`${match.path}admin`}>
            <ScrolltoTop />
            <AdminPanel admin = {user.admin}/>
          </Route>
          <Route path = {`${match.path}filtermovies/:filter`}>
            <ScrolltoTop />
            <FilterContent type = 'movie' />
          </Route>
          <Route path = {`${match.path}filtertvshows/:filter`}>
            <ScrolltoTop />
            <FilterContent type = 'tvshow' />
          </Route>
          <Route path = {`${match.path}filtercelebrities/:filter`}>
            <ScrolltoTop />
            <FilterCelebrity type = 'celebrity' />
          </Route>
          <Route path = {`${match.path}:filter/movie`}>
            <ScrolltoTop />
            <NewsAwardsEvents type = 'movie' admin = {user.admin}/>
          </Route>
          <Route path = {`${match.path}:filter/tvshow`}>
            <ScrolltoTop />
            <NewsAwardsEvents type = 'tvshow' admin = {user.admin} />
          </Route>
          <Route path = {`${match.path}:filter/latest`}>
            <ScrolltoTop />
            <NewsAwardsEvents type = 'latest' admin = {user.admin}/>
          </Route>
          <Route path = {`${match.path}:filter/popular`}>
            <ScrolltoTop />
            <NewsAwardsEvents type = 'popular' admin = {user.admin}/>
          </Route>
          <Route path = {`${match.path}celebrity/:id`}>
            <ScrolltoTop />
            <CelebrityDetails admin = {user.admin}/>
          </Route>
        </Switch>
      </div>
    );
}

export default Content;