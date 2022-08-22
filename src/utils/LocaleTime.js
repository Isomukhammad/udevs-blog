export const setLocaleTime = (data) => {
    try{
        if(!data.createdAt){
            const {seconds} = data.createdAd;
            const day = new Date(seconds * 1000).toLocaleDateString(); 
            const hour = new Date(seconds * 1000).toLocaleTimeString();
            const allTime = hour + ' ' + day;
    
            return allTime
        } else {
            const {seconds} = data.createdAt;
            const day = new Date(seconds * 1000).toLocaleDateString(); 
            const hour = new Date(seconds * 1000).toLocaleTimeString();
            const allTime = hour + ' ' + day;
    
            return allTime
        }
    } catch(error){
        return false;
    }
}