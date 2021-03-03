export default function(shopsData = [], action) {
    
    if(action.type == 'saveShopsData') {
        var shopsDataCopy = action.shopsData;
        return shopsDataCopy;
    } else {
        return shopsData;
    }
}