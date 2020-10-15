export const startSlideShow = (timer, slideTimeout) => {
    timer += 1;
    if(timer === 1){
        timer = 0
        return slideTimeout();
        
    }
}