//1. Kолекция с всички събития.

var Events = {
    eventId: [],
    eventName: [],
    access: [],
    attendants: []
};

//4. Създава ново събитие. Задължителни атрибути на събитието са неговото име.
//Ако потребителя не подаде флаг, указващ дали събитието е подходящо за непълнолетни то по подразбиране е.

var eventIdCounter = 0;

var createEvent = function(_eventName, _access){
    if(_eventName == null){
        console.log("You must enter a name for your event. Operation not successful.");
        return;
    }
    
    eventIdCounter++;
    Events.eventId[Events.eventId.length] = eventIdCounter;
    Events.eventName[Events.eventName.length] = _eventName;
    Events.attendants[Events.attendants.length]= [""];

    if(_access != true){
        Events.access[Events.access.length] = false;
        console.log("Event successfully created. Event Id: " + Events.eventId[Events.eventId.length - 1]);
        return;
    }
    
    Events.access[Events.access.length] = _access;
    console.log("Event successfully created. Event Id: " + Events.eventId[Events.eventId.length - 1]);
}

var printEventInfo = function(_eventId){
    if(isNaN(_eventId)){
        console.log("Input data is not in correct format. Operation not successful.");
        return;
    }
    if(_eventId > eventIdCounter){
        console.log("The event you are looking for does not yet exist. Operation not successful.");
        return;
    }

    var index = Events.eventId.indexOf(_eventId);
    console.log("Event " + Events.eventId[index] + ": " + Events.eventName[index] + ". " + checkAccess(Events.access[index]));
};

var checkAccess = function(value){
    if(value){
        return "The event doesn't let underaged attendants.";
    }
    else{
        return "Attendants of all ages are welcome.";
    }
};

