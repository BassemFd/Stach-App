export default function(search = {}, action) {
    if(action.type == 'createSearch') {
        let newSearch = {salonOrHome : action.salonOrHome, date : action.date, hour : action.hour, address : action.address, latitude : action.latitude, longitude : action.longitude, service : action.service, experience : action.experience};
        return newSearch;
    } else {
        return search;
    }
}