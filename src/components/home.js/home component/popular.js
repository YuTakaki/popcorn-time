import React, {useState, useEffect, useContext, memo} from 'react';
import { API_CODE } from '../../../context/apiCode';
import axios from 'axios';
import '../../../styles/css/popular.css';
import { Link } from 'react-router-dom';

const Popular = ({category}) => {
    const {code} = useContext(API_CODE);
    const [popularShows, setPopularShows] = useState({
        results : [{}]
    });

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/${category}/popular?api_key=${code}&language=en-US&page=1`).then(res => {
            setPopularShows(res.data);
        });
    }, []);

    useEffect(() => {
        // console.log(popularShows);

    }, [popularShows]);

    const showList = popularShows.results.map((show, i) => (
        <Link to={`/${category}/${show.id}`} key={i}>
            <li key={show.id}>
            
                <img src={`http://image.tmdb.org/t/p/w500//${show.poster_path}`}/>
                <div className='showDetails'>
                    <h2>{show.original_title || show.original_name}</h2>
                    <h3>{show.vote_average}/10</h3>
                </div>
                
            </li>

        </Link>
        
    ))

    return ( 
        <div className='popular'>
            <div className='header'>
                <h1>Popular</h1>
                <Link to={`/browse/${category}/popular?page=1`}><h3>View More</h3></Link>
            </div>
            <div className='popularContainer'>
                <ul>
                    {showList}
                </ul>
            </div>
        </div>
     );
}
 
export default memo(Popular);