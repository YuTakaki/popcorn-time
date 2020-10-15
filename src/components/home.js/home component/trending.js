import React, {useState, useContext, useEffect, memo, createContext} from 'react';
import axios from 'axios';
import {API_CODE} from '../../../context/apiCode';
import '../../../styles/css/trendingMovie.css';
import SlideShow from './trending/slideshow';
import CurrentList from './trending/currentList';

const Trending = ({category, children}) => {
    const {code} = useContext(API_CODE);
    const [current, setCurrent] = useState({
        currentList_array: [1, 2, 3],
        video : {
            results : {
                key : ''
            }
        }
    })
    const [params, setparams] = useState({
        page: 1,
        time_window: 'day',
        current_index: 0,
    })
    const [trendingShows, setTrendingShows] = useState({
        results : [{}]
    });

    const set = (sets, datas, key, value) => {
        sets({
            ...datas,
            [key] : value
        })
    }

    var timeout;
    const slideTimeout = () => {
        timeout = setTimeout(() => {
            index_condition();
        }, 4000, () => clearTimeout(timeout));
    }

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/trending/${category}/${params.time_window}?api_key=${code}`).then(res => {
            
            setTrendingShows(res.data);
            
        });
    }, []);
    

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/${category}/${trendingShows.results[params.current_index].id}/videos?api_key=${code}&language=en-US`)
                    .then((res) =>{
                        const results = res.data.results.length > 0 ? res.data.results[0] : {key : 'none'}
                        setCurrent({
                            ...current,
                            video : results
                        })

            });
    }, [trendingShows]);

    const index_condition = () => {
        if(params.current_index === trendingShows.results.length - 1){
            set(setparams, params, 'current_index', 0);
        }else{
            set(setparams, params, 'current_index', params.current_index + 1);
        }
    }
    
    useEffect(() => {
        slideTimeout();
        if(trendingShows.results.length > 1){
            
            
            axios.get(`https://api.themoviedb.org/3/${category}/${trendingShows.results[params.current_index].id}/videos?api_key=${code}&language=en-US`)
                    .then((res) =>{
                        // console.log(current.currentList_array);
                        setCurrent({
                            ...current,
                            currentList_array : []
                        })
                        var index = params.current_index;
                        if(index === trendingShows.results.length - 1){
                            index = 0;
                        }else{
                            index = params.current_index + 1;
                        }
                        let next = [index];
                        for(let i = 0; i < 2; i++){
                            
                            if(next[i] === trendingShows.results.length - 1){
                                next.push(0);
                            }else{
                                next.push(next[i] + 1);
                            }
                        }
                        const results = res.data.results.length > 0 ? res.data.results[0] : {key : ''}
                        setCurrent({
                            currentList_array : next,
                            video : results
                        })

                });
        }
        
        return () => {
            clearTimeout(timeout);
          }
    }, [params]);

    useEffect(() => {
        
    }, [current]);
    

    const increment = () => {
        clearTimeout(timeout);
        index_condition();
        
    }
    const decrement = () => {
        clearTimeout(timeout);
        if(params.current_index === 0){
            set(setparams, params, 'current_index', trendingShows.results.length - 1);

        }else{
            set(setparams, params, 'current_index', params.current_index - 1);
        } 
        

    }
    const timeWindow = (e) => {
        const checked = e.target.checked;
        clearTimeout(timeout);
        // console.log(checked);
        const time_window = checked ? 'week' : 'day' 
        setparams({
            ...params,
            time_window,
            current_index : 0
        });
        clearTimeout(timeout);
        axios.get(`https://api.themoviedb.org/3/trending/${category}/${time_window}?api_key=${code}`).then(res => {
            setTrendingShows(res.data);
            clearTimeout(timeout);
        });
    }
    return ( 
        <section className='trending'>
            <div className='header'>
                <h1 className='headerName'>Trending {category}</h1>
                <div className='toggle'>
                    <input type='checkbox' id={`toggleBtn${category}`} onClick={timeWindow}/>
                    <label htmlFor={`toggleBtn${category}`}  className='Week'>Week</label>
                    <label htmlFor={`toggleBtn${category}`}  className='day'>Day</label>
                    <label htmlFor={`toggleBtn${category}`}  className='button'></label>
                </div>
            </div>
            <div className='slideShowContainer'>
                <SlideShow category={category} increment={increment} decrement={decrement} results={trendingShows.results} current={params.current_index} video={current.video.key || ''}/>
                <CurrentList category={category} current={current.currentList_array} results={trendingShows.results} time_window={params.time_window} />
            </div>
        </section>
        
     );
}
 
export default memo(Trending);