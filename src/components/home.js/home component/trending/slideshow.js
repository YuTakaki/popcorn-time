import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import star from '../../../../assets/star.png'

const SlideShow = ({category, decrement, increment, results, current, video}) => {
    

    return ( 
        <div className='slideshow'>
                <figure className='slideshow_grid'>
                    <button onClick={decrement} className='prev fa fa-angle-left'></button>
                    <button onClick={increment} className='next fa fa-angle-right'></button>
                    <div className='showImage'>
                        <img src={`http://image.tmdb.org/t/p/w1280//${results[current].backdrop_path}`} alt={results[current].original_title || results[current].original_name}></img>
                    </div>
                    <div className='cover'>
                        <img src={`http://image.tmdb.org/t/p/w500//${results[current].poster_path}`} alt={results[current].original_title || results[current].original_name}></img>
                    </div>
                    <div className='caption'>
                        <h1>"{results[current].original_title || results[current].original_name}"</h1>
                        <p>Release Date: {results[current].release_date || results[current].first_air_date}</p>
                    </div>
                </figure>
                <div className='slideshow_hover'>
                    <img src={star} alt='star'/>
                    <h3>{results[current].vote_average} / 10</h3>
                    <Link to={`/${category}/${results[current].id}`}>
                        <h2>View Details</h2>
                    </Link>
                    <a href={`https://www.youtube.com/watch?v=${video}`} target="_blank" rel="noopener noreferrer">
                        <div className='watchYoutube'>
                            <i className='fa fa-play-circle-o'></i>
                            <h1>Watch Trailer</h1>
                        </div>
                    </a>
                    
                </div>   
        </div>
     );
}
 
export default SlideShow;