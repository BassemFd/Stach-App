export default function(experience = "Non, Merci!", action){ 
    if(action.type == 'experience'){
        var experienceCopy = action.experience;
        return experienceCopy
    } else {
        return experience
    }
}