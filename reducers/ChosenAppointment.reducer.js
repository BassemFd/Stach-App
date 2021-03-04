export default function(details = {}, action){ 
    if(action.type == 'finalAppointment'){
        
        let finalAppointment = {
            hour: action.hour,
            hairdresser: action.hairdresser, 
            prestation: action.prestation, 
            experience: action.experience ,
            date: action.date,
            shopDetailsName: action.shopDetailsName,
            shopDetailsAddress: action.shopDetailsAddress,
            shopDetailsID: action.shopDetailsID
        }
        // console.log("HOUR", finalAppointment.shopDetails)
        return finalAppointment
    } else {
        return details;
    }
}