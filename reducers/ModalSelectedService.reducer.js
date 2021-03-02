export default function(selectedService = "TOUTES LES PRESTATIONS", action) {
    if(action.type == 'chooseService') {
        return action.selection;
    } else {
        return selectedService;
    }
}