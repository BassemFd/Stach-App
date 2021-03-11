export default function(communication = {}, action){ 
    if(action.type == 'saveCommunication'){
       
        var communicationCopy = action.communication
        return communicationCopy
    } else {
        return communication
    }
}