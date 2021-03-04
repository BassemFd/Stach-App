export default function(experience = "Non, Merci!", action){ 
    if(action.type == 'experience'){
        let experienceCopy = {
            packageName: action.packageName,
            price: action.price,
            duration: action.duration, 
            description: action.description
        }
        
        return experienceCopy
    } else {
        return experience
    }
}