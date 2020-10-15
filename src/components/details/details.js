import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { API_CODE } from '../../context/apiCode';
import '../../styles/css/details.css';
import star2 from '../../assets/star2.png';
import heart from '../../assets/heart.png'

const Details = (props) => {
    window.scrollTo(0, 0);
    const {code} = useContext(API_CODE);
    const [pathname, setPathname] = useState(props.location.pathname);
    const [infos, setinfos] = useState({
        details : {
            genres : []
        },
        video : {},
        reviews : {
            results : []
        }
    });
    const request = () => {
        axios.get(`https://api.themoviedb.org/3${pathname}?api_key=${code}&language=en-US`)
            .then(resDetails => {
                
                axios.get(`https://api.themoviedb.org/3${pathname}/videos?api_key=${code}&language=en-US`)
                    .then(resVideos => {
                        axios.get(`https://api.themoviedb.org/3${pathname}/reviews?api_key=${code}&language=en-US&page=1`)
                        .then(resReview => {
                            const video = resVideos.data.results.length > 0 ? resVideos.data.results[0] : {key : undefined};
                            const reviews = resReview.data.results.length > 0 ? resReview.data : {results : []};
                            setinfos({
                                details : resDetails.data,
                                video,
                                reviews
                            })

                        })
                        
                    })
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        request();
    },[])
    useEffect(() => {
        if(pathname !== props.location.pathname){
            setPathname(props.location.pathname);
        }
        return

    });
    useEffect(() => {
        request();

    }, [pathname]);
    useEffect(() => {
        console.log(infos)
    },[infos])



    const listingGenres = infos.details.genres.map(genre => (
        <h3>{genre.name}</h3>
    ))

    const listingReviews = infos.reviews.length > 0 ? infos.reviews.results.map((rev, i) => (
        <div className='review-container'>
            <a href={rev.url}>
                <h4>{rev.author}</h4>
            </a>
            <p className={`review-content${i}`}>{rev.content}</p>
            {}
        </div>
    )) : (<h2>No Reviews</h2>)
    return ( 
        <div className='details_page'>
            
            <div className='showDescription'>
                <div className='poster'>
                    <img src={`http://image.tmdb.org/t/p/w500//${infos.details.poster_path}`} alt={infos.details.original_title || infos.details.original_name} />
                    <a href={`${infos.details.homepage}`} target='_blank'>
                        <div>
                            <h3>Watch Online</h3>
                        </div>
                    </a>
                </div>
                <div className='details_content'>
                    <div className='title'>
                        <h1>{infos.details.title || infos.details.original_name}</h1>
                        <h3>({new Date(infos.details.first_air_date).getFullYear() || new Date(infos.details.release_date).getFullYear()})</h3>
                        
                    </div>
                    <div className='genres'>
                        {listingGenres}
                    </div>
                        
                    
                    <div className='rating'>
                        <div className='popularity'>
                            <img src={heart} width='20' height='20'/>
                            <h3>{infos.details.popularity} - Popularity</h3>

                        </div>
                        <div className='vote-average'>
                            <img src={star2} width='20' height='20'/>
                            <h3>{infos.details.vote_average} - Vote Average</h3>

                        </div>
                        
                    </div>
                    
                </div>
            </div>
            <div className='overview'>
                <h1>Overview</h1>
                <p>{infos.details.overview}</p>
            </div>
            <div className='trailer_reviews_container'>
                <div className='trailer'>
                    <iframe
                        src={`https://www.youtube.com/embed/${infos.video.key}`}>
                    </iframe>
                </div>
                <div className='reviews'>
                    <h1>Reviews</h1>
                    {listingReviews}
                </div>

            </div>
            
            
        </div>
     );
}
 
export default Details;