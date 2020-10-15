import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { API_CODE } from '../../context/apiCode';
import '../../styles/css/advance.css';
import {Link} from 'react-router-dom';
import noImage from '../../assets/noImage.png'

const AdvanceSearch = () => {
    window.scrollTo(0, 0);
    const {code} = useContext(API_CODE);
    const [info, setInfo] = useState([]);
    const [params, setParams] = useState({
        genre : [{}],
        sort_movie : ['popularity.desc','popularity.asc', 'release_date.asc', 'release_date.desc', 'revenue.asc', 'revenue.desc', 'primary_release_date.asc',
                'primary_release_date.desc', 'original_title.asc', 'original_title.desc', 'vote_average.asc', 'vote_average.desc', 'vote_count.asc', 'vote_count.desc'],
        sort_tv : ['popularity.desc','popularity.asc','vote_average.asc', 'vote_average.desc', 'first_air_date.asc', 'first_air_date.desc', ],
        sort : 'popularity.desc',
        category : 'movie',
        vote_average : '0',
        genre_choice : '',
        year : '',
        pages : '1'
    });

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/genre/${params.category}/list?api_key=${code}&language=en-US`)
            .then(res => {

                setParams({
                    ...params,
                    genre : res.data.genres
                });
            })
            .catch(err => console.log(err));
        axios.get(`https://api.themoviedb.org/3/discover/${params.category}?api_key=${code}&language=en-US&sort_by=${params.sort}&vote_average.gte=${params.vote_average}&with_genre=${params.genre_choice}&year=${params.year}&page=${params.pages}`)
            .then(res => {
                setInfo(res.data.results);
            })
    },[]);


    const onChangeParams = (key, value) => {
        setParams({
            ...params,
            [key] : value
        })
    }

    const submit = (e) => {
        e.preventDefault();
        document.querySelector('.filterForm').classList.remove('activeFilterForm');
        setParams({
            ...params,
            pages : '1',
        });
        axios.get(`https://api.themoviedb.org/3/discover/${params.category}?api_key=${code}&language=en-US&sort_by=${params.sort}&vote_average.gte=${params.vote_average}&with_genres=${params.genre_choice}&year=${params.year}&page=1`)
            .then(res => {
                console.log(res.data)
                setInfo(res.data.results);
            })
        console.log(params)
    }

    const loadMore = () => {
        let page = Number(params.pages)+1;
        
        axios.get(`https://api.themoviedb.org/3/discover/${params.category}?api_key=${code}&language=en-US&sort_by=${params.sort}&vote_average.gte=${params.vote_average}&with_genre=${params.genre_choice}&year=${params.year}&page=${page}`)
            .then(res => {
                console.log(res);
                setInfo([...info, ...res.data.results]);
                setParams({
                    ...params,
                    pages : page.toString()
                });
            });
            


    }

    const advance_content = info.map((show, i) => (
        <div key={i} className='poster'>
            <div className='poster_container'>
                    <img src={`http://image.tmdb.org/t/p/w500//${show.poster_path}` || noImage} alt={show.original_title || show.original_name}/>
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

    const toggleFormFilter = () => {
        document.querySelector('.filterForm').classList.toggle('activeFilterForm');
    }
    const closeFormFilter = () => {
        document.querySelector('.filterForm').classList.remove('activeFilterForm');
    }
    return ( 
        <div className='advanceSearch'>
            <div className='filterForm'>
                <h1>Filter</h1>
                <form onSubmit={submit}>
                    <div>
                        <label htmlFor='genres'>Genres</label>
                        <select id='genres' onChange={(e) => onChangeParams('genre_choice', e.target.value)}>
                        <option value=''>All</option>
                            {params.genre.map((genre, i) => (
                                <option key={i} value={genre.id}>{genre.name}</option>
                            ))}
                            
                        </select>
                    </div>
                    <div>
                        <label htmlFor='category'>Category</label>
                        <select id='category' onChange={(e) => onChangeParams('category', e.target.value)}>
                            <option value='movie'>Movie</option>
                            <option value='tv'>TV</option>
                            
                        </select>
                    </div>
                    <div>
                        <label htmlFor='sortBy'>Sort By</label>
                        <select id='sortBy' onChange={(e) => onChangeParams('sort', e.target.value)}>
                            {params.category === 'movie' ? params.sort_movie.map((genre, i) => (
                                <option key={i} value={genre}>{genre}</option>
                            )) : params.sort_tv.map((genre, i) => (
                                <option key={i} value={genre}>{genre}</option>
                            ))}
                            
                        </select>
                    </div>
                    <div>
                        <label htmlFor='year'>Year</label>
                        <input type='number' id='year' min={params.category === 'movie' ? 1874 : 1883} max={new Date(Date.now()).getFullYear()} minLength='4' maxLength='4' defaultValue='' onChange={(e) => onChangeParams('year', e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor='vote_ave'>Vote Average</label>
                        <input type='number' id='vote_ave' min='0' max='10' defaultValue='' onChange={(e) => onChangeParams('vote_average', e.target.value)} />
                    </div>
                    <input type='submit' />
                </form>
                
            </div>
            <div className='advance-content-container'>
                <h1>Advance Search</h1>
                <div className='advance-content'>
                    {advance_content}  
                </div>
                <button onClick={loadMore} className='loadMore'>Load More</button>

            </div>
            
            
            <div className='filter-icon'>
                <i onClick={toggleFormFilter} className='fa fa-filter'></i>
                
            </div>
            

        </div>
     );
}
 
export default AdvanceSearch;