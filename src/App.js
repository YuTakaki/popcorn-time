import React, {Suspense, lazy, useEffect, useState} from 'react';
import NavBar from './components/nav/nav';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import ApiCode from './context/apiCode';
import Footer from './components/footer/footer';
import Details from './components/details/details';
import Browse from './components/browse/browse';
import AdvanceSearch from './components/advanceSearch/advanceSearch';
import ViewAll from './components/viewAllTrending/viewAllTrending';


const Home = lazy(() => import('./components/home.js/home'));

const App = () => {
  // const [pathname, setPathname] = useState();

  const movieURList = ['popular', 'now_playing', 'top_rated', 'upcoming'];
  const tvURList = ['popular', 'airing_today', 'on_the_air', 'top_rated'];
  const URLList = [
    {
      show : 'movie',
      category : 'Popular',
      url : 'popular'
    },
    {
      show : 'movie',
      category : 'Now Playing',
      url : 'now_playing'
    },
    {
      show : 'movie',
      category : 'Top Rated',
      url : 'top_rated'
    },
    {
      show : 'movie',
      category : 'Upcoming',
      url : 'upcoming'
    },
    {
      show : 'tv',
      category : 'Popular',
      url : 'popular'
    },
    {
      show : 'tv',
      category : 'Airing Today',
      url : 'airing_today'
    },
    {
      show : 'tv',
      category : 'On the Air',
      url : 'on_the_air'
    },
    {
      show : 'tv',
      category : 'Top Rated',
      url : 'top_rated'
    },
  ]
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <ApiCode>
          <header>
            <NavBar />
          </header>
          <div className="App">
            <main>
              
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/movie/:id' component={Details} />
                <Route path='/tv/:id' component={Details} />
                {URLList.map(show => (
                  <Route path={`/browse/${show.show}/${show.url}`} render={(props) => <Browse {...props} url={show.url} showCategory={show.category} category={show.show} />} />
                ))}
                <Route path='/advance-search' component={AdvanceSearch} />
                <Route path='/trending/movie' render={(props) => <ViewAll {...props} title='Trending Movies' />} />
                <Route path='/trending/tv' render={(props) => <ViewAll {...props} title='Trending TV Shows' />} />
              </Switch>
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </ApiCode>
      </Suspense>
    </Router>
    
  );
}

export default App;
