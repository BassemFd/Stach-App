export default function(shopDetails = {}, action){ 
    if(action.type == 'selectOffer'){
        var shopDetailsCopy = action.shopDetails;
        console.log(shopDetailsCopy);
        return shopDetailsCopy
    } else {
        return shopDetails
    }
}