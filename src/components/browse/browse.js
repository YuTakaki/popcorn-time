import React, {useState, useEffect, useContext, memo} from 'react';
import axios from 'axios';
import { API_CODE } from '../../context/apiCode';
import '../../styles/css/browse.css';
import {Link, useLocation} from 'react-router-dom';
import Pagination from '../browse/browse_components/pagination'
import BrowseComponent from './browse_components/browse_content';

const Browse = (props) => {
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    window.scrollTo(0, 0);
    let query = useQuery();
    const {code} = useContext(API_CODE);
    const [infos, setinfos] = useState({
        total_pages : 0,
        results : [{
            genres: []
        }],
    })
    const [params, setparams] = useState({
        page : query.get('page') || 1,
        pathname : props.location.pathname
        
    })
    const [pagination, setPagination] = useState({
        otherPages : [],
        firstPages : [],
        lastPages : []
    })
    const addActive = () => {
        if(document.querySelector(`.btn${params.page}`)){
            document.querySelectorAll('.page_btn').forEach(btn => btn.classList.remove('active'))
            document.querySelectorAll(`.btn${params.page}`).forEach(btn => btn.classList.add('active'))
        }
    }
    
    useEffect(() => {
        
        axios.get(`https://api.themoviedb.org/3/${props.category}/${props.url}?api_key=${code}&language=en-US&page=${params.page}`)
            .then(res => {
                setinfos(res.data);
                const queryPage = Number(query.get('page')) || 1;
                const paginationArray = Array.from({length : res.data.total_pages}, (_, i) => i + 1);
                
                const firstPages = paginationArray.slice(0, 5);
                const lastPages = paginationArray.slice(paginationArray.length - 5);
                const otherPages = firstPages.includes(queryPage) || lastPages.includes(queryPage) ? [] : Array.from({length : 5}, (_, i) => queryPage + i - 1)
                setparams({
                    ...params,
                    page : queryPage,
                    pathname : props.location.pathname
                });
                setPagination({
                    ...pagination,
                    firstPages,
                    lastPages,
                    otherPages
                })

                props.history.push(`?page=${params.page}`);  
                
            });
        
    }, []);
    useEffect(() => {
        if(params.pathname !== props.location.pathname){
            axios.get(`https://api.themoviedb.org/3/${props.category}/${props.url}?api_key=${code}&language=en-US&page=${params.page}`)
            .then(res => {
                setinfos(res.data); 
                setparams({
                    ...params,
                    page : 1,
                    pathname : props.location.pathname
                });
                const paginationArray = Array.from({length : res.data.total_pages}, (_, i) => i + 1);
                const queryPage = Number(query.get('page')) || 1;
                
                const firstPages = paginationArray.slice(0, 5);
                const lastPages = paginationArray.slice(paginationArray.length - 5);
                const otherPages = firstPages.includes(queryPage) || lastPages.includes(queryPage) ? [] : Array.from({length : 5}, (_, i) => queryPage + i - 1)
                setPagination({
                    ...pagination,
                    firstPages,
                    lastPages,
                    otherPages
                })
            });
        }
        return
        
    })

    useEffect(() => {
        // console.log(params);
        props.history.push(`?page=${params.page}`);  
        if(params.page >= pagination.firstPages[pagination.firstPages.length - 1]  &&
            !pagination.otherPages.includes(params.page)){
                const otherPages = Array.from({length : 5}, (_, i) => params.page + i - 1 );
                setPagination({
                    ...pagination,
                    otherPages
                })
        }
        if(params.page === pagination.lastPages[0]  &&
            !pagination.otherPages.includes(params.page)){
                const otherPages = Array.from({length : 5}, (_, i) => params.page + i - 3 );
                setPagination({
                    ...pagination,
                    otherPages
                })
        }
        if(params.page === pagination.otherPages[pagination.otherPages.length - 1] || params.page === pagination.otherPages[0]){
            
            const otherPages = Array.from({length : 5}, (_, i) => params.page + i - 1 );
            setPagination({
                ...pagination,
                otherPages
            })
        }
        addActive();
        
        
        
        axios.get(`https://api.themoviedb.org/3/${props.category}/${props.url}?api_key=${code}&language=en-US&page=${params.page}`)
            .then(res => {
                setinfos(res.data); 
            });

    }, [params])

    useEffect(() => {
        addActive();
    }, [pagination]);

    const changePage = (e) => {
        setparams({
            ...params,
            page : Number(e.target.textContent)
        });
    };

    const next = () => {
        let page = params.page+1;
        page = page > Number(infos.total_pages) ? Number(infos.total_pages) : page
        setparams({
            ...params,
            page
        })
    }

    const prev = () => {
        let page = params.page - 1;
        page = page < 1 ? 1 : page
        setparams({
            ...params,
            page
        })
    }

    return ( 
        <div className='browse'>
            <h1>{props.showCategory} {props.category}</h1>
            <div className='pagination'>
                <div className='paginationPC'>
                    <Pagination pagination={pagination} params={params} category='pc' next={next} prev={prev} changePage={changePage}/>
                </div>
                <div className='paginationMobile'>
                    <Pagination pagination={pagination} params={params} category='mobile' next={next} prev={prev} changePage={changePage}/>
                </div>
            </div>
            <div className='page_content'>
                <BrowseComponent infos={infos} params={params} />
            </div>
            <div className='pagination'>
                <div className='paginationPC'>
                    <Pagination pagination={pagination} params={params} category='pc' next={next} prev={prev} changePage={changePage}/>
                    
                </div>
                <div className='paginationMobile'>
                    <Pagination pagination={pagination} params={params} category='mobile' next={next} prev={prev} changePage={changePage}/>
                </div>
            </div>
        </div>
     );
}
 
export default memo(Browse);