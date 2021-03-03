export default function(prestation = "Aucune", action){ 
    if(action.type == 'prestation'){
        var prestationCopy = action.prestation;
        
        return prestationCopy
    } else {
        return prestation
    }
}