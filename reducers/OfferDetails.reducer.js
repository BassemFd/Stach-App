export default function (shopDetails = {}, action) {
  if (action.type == 'selectOffer') {
    // console.log("ACTION ", action.shopDetails)
    var shopDetailsCopy = action.shopDetails;
    return shopDetailsCopy;
  } else {
    return shopDetails;
  }
}
