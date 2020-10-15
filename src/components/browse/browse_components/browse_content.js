import React from 'react';
import {Link} from 'react-router-dom';

const BrowseComponent = ({infos, params}) => {
    const pageContent = infos.results.map((show, i) => (
        <div className='poster' key={i}>
            <div className='poster_container'>
                    <img src={`http://image.tmdb.org/t/p/w500//${show.poster_path}`} alt={show.original_title || show.original_name}/>

                <Link to={`/${/(movie)/.test(params.pathname) ? 'movie' : /(tv)/.test(params.pathname) ? 'tv' : ''}/${show.id}`}>
                    <div className='posterHover'>
                        <h3>{show.vote_average} / 10</h3>
                        <h1>View Details</h1>
                    </div>

                </Link>
            </div>
            <div className='poster_title'>
                <h4>{show.original_title || show.original_name}</h4>

            </div>
        </div>
    ))
    return ( 
        <>
            {pageContent}
        </>
     );
}
 
export default BrowseComponent;