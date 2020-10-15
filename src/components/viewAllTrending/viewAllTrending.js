import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { API_CODE } from '../../context/apiCode';
import {Link} from 'react-router-dom';
import '../../styles/css/viewAll.css'

const ViewAll = (props) => {
    window.scrollTo(0, 0);
    const {code} = useContext(API_CODE);
    const [infos, setInfos] = useState({
        results : [{}]
    });

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3${props.location.pathname}?api_key=${code}`).then(res => {
            setInfos(res.data);
        });
    },[]);

    return ( 
        <div className='viewAll'>
            <h1>{props.title}</h1>
            <div className='content'>
                {
                    infos.results.map((show, i) => (
                        <div key={i} className='poster'>
                            <div className='poster_container'>
                                    <img src={`http://image.tmdb.org/t/p/w500//${show.poster_path}`} alt={show.original_title || show.original_name}/>
                                <Link to={`/${show.original_title? 'movie' : 'tv'}/${show.id}`}>
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
                }

            </div>

        </div>
     );
}
 
export default ViewAll;