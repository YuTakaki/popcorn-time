import React, {useState, useEffect, useContext} from 'react';
import '../../styles/css/nav.css';
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import { API_CODE } from '../../context/apiCode';
import axios from 'axios';

const NavBar = () => {
    const {code} = useContext(API_CODE); 
    const [input, setInput] = useState('');
    const [searched, setSearched] = useState([]);
    const animateSearch = () => {
        document.querySelector('#quickSearch').classList.toggle('searchClicked');
        document.querySelector('#quickSearch').value = '';
        setSearched([]);
        setInput('');
    };
    const animateNav = () => {
        document.querySelector('.nav-option-container').classList.toggle('nav-option-container-active');
        
    };
    const optionList = (className) => {
        document.querySelector(className).classList.toggle('dropdown');
    };

    const removeActivateNav = (className) => {
        document.querySelector('.nav-option-container').classList.remove('nav-option-container-active');
    };
    const onChangeInput = (e) => {
        setInput(e.target.value);
    }
    const eraseAll = () => {
        setSearched([]);
        setInput('');
    }

    useEffect(() => {
        if(input.length === 0){
            setSearched([]);
        }else{
            axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${code}&query=${input}`)
                .then(res => {
                    const search = res.data.results.filter(data => data.media_type !== 'person');
                    setSearched(search);
                });
        };
        
    }, [input]);

    return ( 
        <div className='nav-container'>
            <div className='logo-search-container'>
                
                <div className='logo-container'>
                    <button onClick={animateNav}><i className='fa fa-bars'></i></button>
                    <Link to='/'><img src={logo} alt='logo image'/></Link>
                    <Link to=''><h1>Popcorn Time</h1></Link>
                    
                    
                </div>
                <div className='search-container'>
                    <label onClick={animateSearch} htmlFor='quickSearch'><i className='fa fa-search'></i></label>
                    <input value={input} type='text' id='quickSearch' placeholder='Quick search' autoComplete="off" onChange={onChangeInput}/>
                    <div className='searchList'>
                        {searched.map((search, i) => (
                            <Link key={i} to={`/${search.media_type}/${search.id}`} >
                                <div className='searched_content' onClick={eraseAll}>
                                    <img src={`http://image.tmdb.org/t/p/w500//${search.poster_path}`} alt={search.original_title || search.original_name}></img>
                                    <h1>{search.original_title || search.original_name}</h1>
                                </div>
                            </Link>
                            
                        ))}
                    </div>
                </div>
            </div>
            <div className='nav-option-container'>
                <ul className='options'>
                    <li className='movies'>
                        <div onClick={() => optionList('.movies .optionList')}>Movies</div>
                        <ul className='optionList'>
                            <Link onClick={removeActivateNav} to='/browse/movie/popular?page=1'><li>Popular</li></Link>
                            <Link onClick={removeActivateNav} to='/browse/movie/now_playing?page=1'><li>Now Playing</li></Link>
                            <Link onClick={removeActivateNav} to='/browse/movie/upcoming?page=1'><li>Upcoming</li></Link>
                            <Link onClick={removeActivateNav} to='/browse/movie/top_rated?page=1'><li>Top Rated</li></Link>
                        </ul>
                    </li>
                    <li className='tv'>
                        <div onClick={() => optionList('.tv .optionList')}>TV Shows</div>
                        <ul className='optionList'>
                            <Link onClick={removeActivateNav} to='/browse/tv/popular?page=1'><li>Popular</li></Link>
                            <Link onClick={removeActivateNav} to='/browse/tv/airing_today?page=1'><li>Airing Today</li></Link>
                            <Link onClick={removeActivateNav} to='/browse/tv/on_the_air?page=1'><li>On TV</li></Link>
                            <Link onClick={removeActivateNav} to='/browse/tv/top_rated?page=1'><li>Top Rated</li></Link>
                        </ul>
                    </li>
                        <Link onClick={removeActivateNav} to='/advance-search'><li className='genres'><div>Advance Search</div></li></Link>
                </ul>
                <div onClick={removeActivateNav} className='nav-option-space'>
                    {/* <p></p> */}
                </div>
            </div>
            
        </div>
     );
}
 
export default NavBar;