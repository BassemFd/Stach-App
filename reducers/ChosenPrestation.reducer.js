export default function(prestation = "Aucune", action){ 
    if(action.type == 'prestation'){
        
        let prestationCopy = { 
            prestaName: action.prestaName,
            price: action.price,
            duration: action.duration,
            }

        return prestationCopy
    } else {
        return prestation
    }
}