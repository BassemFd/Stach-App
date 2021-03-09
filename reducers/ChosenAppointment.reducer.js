export default function(details = {}, action){ 
    if(action.type == 'finalAppointment'){
        console.log('reducer', action.prestationDuration, action.experienceDuration);
        let finalAppointment = {
            hour: action.hour,
            hairdresser: action.hairdresser, 
            prestation: action.prestation, 
            prestationPrice: action.prestationPrice,
            prestationDuration: action.prestationDuration,
            experience: action.experience ,
            experiencePrice: action.experiencePrice,
            experienceDuration: action.experienceDuration,
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
