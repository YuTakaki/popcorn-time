import React from 'react';
import '../../styles/css/footer.css';
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';

const Footer = () => {
    return ( 
        <div className='footer'>
          
            <div className='logo'>
                <img src={logo}></img>
                <h1>Popcorn Time</h1>
            </div>
        
            <div className='nav-footer'>
                <ul className='options'>
                    <li>
                        <h3>Movies</h3>
                        <ul className='categories'>
                        
                            <Link to='/browse/movie/popular?page=1'><li>Popular</li></Link>
                            <Link to='/browse/movie/now_playing?page=1'><li>Now Playing</li></Link>
                            <Link to='/browse/movie/upcoming?page=1'><li>Upcoming</li></Link>
                            <Link to='/browse/movie/top_rated?page=1'><li>Top Rated</li></Link>
                       
                        </ul>
                    </li>
                    <li>
                        <h3>TV Shows</h3>
                        <ul className='categories'>
                            <Link to='/browse/tv/popular?page=1'><li>Popular</li></Link>
                            <Link to='/browse/tv/airing_today?page=1'><li>Airing Today</li></Link>
                            <Link to='/browse/tv/on_the_air?page=1'><li>On TV</li></Link>
                            <Link to='/browse/tv/top_rated?page=1'><li>Top Rated</li></Link>
                        </ul>
                    </li>
                    
                    <Link  to='/advance-search'><li className='genres'><h3>Advance Search</h3></li></Link>
                </ul>
            </div>
            <div className='social-media'>
                <h3>Follow us on</h3>
                <ul>
                    <a href='https://www.facebook.com/'><li><i class="fa fa-facebook"></i></li></a>
                    <a href='https://twitter.com/'><li><i class="fa fa-twitter"></i></li></a>
                    <a href='https://instagram.com/'><li><i class="fa fa-instagram"></i></li></a>
                </ul>
            </div>
            <div className='copyright'>
                <p>© 2020 Popcorn Time, Yu Takaki</p>
            </div>
        </div>
     );
}
 
export default Footer;