export default function(hairdresser = "Peu Importe", action){ 
    if(action.type == 'hairdresser'){
        var hairdresserCopy = action.hairdresser;
        
        return hairdresserCopy
    } else {
        return hairdresser
    }
}