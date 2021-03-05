export default function(communication = {}, action){ 
    if(action.type == 'saveCommunication'){
        console.log('reducer', action.communication)
        var communicationCopy = action.communication
        return communicationCopy
    } else {
        return communication
    }
}