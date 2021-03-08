export default function(details = {}, action){ 
    if(action.type == 'finalAppointment'){
        
        let finalAppointment = {
            hour: action.hour,
            hairdresser: action.hairdresser, 
            prestation: action.prestation, 
            prestationPrice: action.prestationPrice,
            experience: action.experience ,
            experiencePrice: action.experiencePrice,
            date: action.date,
            shopDetailsName: action.shopDetailsName,
            shopDetailsAddress: action.shopDetailsAddress,
            shopDetailsID: action.shopDetailsID,
            shopDetailsImage: action.shopDetailsImage
        }
        // console.log("HOUR", finalAppointment.shopDetails)
        return finalAppointment
    } else {
        return details;
    }
}
