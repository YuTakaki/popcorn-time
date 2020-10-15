import React from 'react'


const Pagination = ({pagination, params, category, next, prev, changePage}) => {
    const paginationModelPC = pagination.firstPages.slice(0,4).includes(params.page) || pagination.lastPages.slice(1).includes(params.page) ? (
        <>
            <div className='page_btn' onClick={prev}>prev</div>
            {pagination.firstPages.map((num, i) => (
                <div key={i} className={`page_btn btn${num}`} onClick={changePage}>{num}</div>
            ))}
            <div className='other_pages'>...</div>
            {pagination.lastPages.map((num, i) => (
                <div key={i} className={`page_btn btn${num}`} onClick={changePage}>{num}</div>
            ))}
            <div className='page_btn' onClick={next}>next</div>
        </>
    ) : (
        <>
            <div className='page_btn' onClick={prev}>prev</div>
            {pagination.firstPages.slice(0, 3).map((num, i) => (
                <div key={i} className={`page_btn btn${num}`} onClick={changePage}>{num}</div>
            ))}
            <div className='other_pages'>...</div>
            {pagination.otherPages.map((num, i) => (
                <div key={i} className={`page_btn btn${num}`} onClick={changePage}>{num}</div>
            ))}
            <div className='other_pages'>...</div>
           
            {pagination.lastPages.slice(2).map((num, i) => (
                <div key={i} className={`page_btn btn${num}`} onClick={changePage}>{num}</div>
            ))}
            <div className='page_btn' onClick={next}>next</div>
        </>
    );
    
    const paginationModelMobile = pagination.firstPages.slice(0,4).includes(params.page)? (
        <>
            <div className='page_btn' onClick={prev}>prev</div>
            {pagination.firstPages.map((num, i) => (
                <div key={i} className={`page_btn btn${num}`} onClick={changePage}>{num}</div>
            ))}
            <div className='other_pages'>...</div>
            <div className={`page_btn btn${pagination.lastPages[pagination.lastPages.length - 1]}`} onClick={changePage}>{pagination.lastPages[pagination.lastPages.length - 1]}</div>
            <div className='page_btn' onClick={next}>next</div>
        </>
    ) : pagination.lastPages.slice(1).includes(params.page) ? (
        <>
            <div className='page_btn' onClick={prev}>prev</div>
            {pagination.firstPages.slice(0, 1).map((num, i) => (
                <div  key={i} className={`page_btn btn${num}`} onClick={changePage}>{num}</div>
            ))}
            <div className='other_pages'>...</div>
            {pagination.lastPages.map((num, i) => (
                <div key={i} className={`page_btn btn${num}`} onClick={changePage}>{num}</div>
            ))}
            <div className='page_btn' onClick={next}>next</div>
        </>
    ) : (
        <>
            <div className='page_btn' onClick={prev}>prev</div>
            {pagination.firstPages.slice(0, 1).map((num, i) => (
                <div key={i} className={`page_btn btn${num}`} onClick={changePage}>{num}</div>
            ))}
            <div className='other_pages'>...</div>
            {pagination.otherPages.map((num, i)=> (
                <div key={i} className={`page_btn btn${num}`} onClick={changePage}>{num}</div>
            ))}
            <div className='other_pages'>...</div>
           
            <div className={`page_btn btn${pagination.lastPages[pagination.lastPages.length - 1]}`} onClick={changePage}>{pagination.lastPages[pagination.lastPages.length - 1]}</div>
            <div className='page_btn' onClick={next}>next</div>
        </>
    
    );
    return ( 
        <>
            {category === 'pc' ? paginationModelPC : paginationModelMobile}
        </>

     );
}
 
export default Pagination;