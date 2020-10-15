import React from 'react';
import { Link } from 'react-router-dom';
const CurrentList = ({category, current, results, time_window}) => {
    const showList = current.map(num => results[num] ? (
        <Link to={`/${category}/${results[num].id}`} key={results[num].id}>
            <li>
                <img src={`http://image.tmdb.org/t/p/w500//${results[num].poster_path}`} alt={results[num].original_title || results[num].original_name}></img>
                <div className='details'>
                    <h3>{results[num].original_title || results[num].original_name}</h3>
                    <p>Release date:{results[num].release_date || results[num].first_air_date}</p>
                </div>
                
            </li>

        </Link>) : null
)
    return ( 
        
        <div className='currentList'>
            <h2>Up Next</h2>
            <ol>
                {showList}
            </ol>
            
            <Link to={`trending/${category}/${time_window}`}><h3>View More</h3></Link>
        </div>
        
     );
}
 
export default CurrentList;