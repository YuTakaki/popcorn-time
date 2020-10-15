import React from 'react';
import Trending from './home component/trending';
import '../../styles/css/home.css';
import Popular from './home component/popular';

const Home = () => {
    window.scrollTo(0, 0);
    return ( 
        <div className='home_main'>
                <Trending category='movie' />
                <Popular category='movie' />
                <Trending category='tv' />
                <Popular category='tv' />
                

        </div>
     );
}
 
export default Home;