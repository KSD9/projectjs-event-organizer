//1. Kолекция с всички събития.
var Events = {
    id: [],
    name: [],
    access: [],
    attendants: []
};

//2. Извежда всички вече съхранени събития, като визуализира цялата необходима информация за тях.
var printAllEvents = function(){
    for(var i = 0; i < Events.id.length; i++){
        printEventInfo(Events.id[i]);
    }
};

var printEventInfo = function(eventId){
    if(isNaN(eventId)){
        console.log("Моля въвете число.");
        return;
    }
    if(eventId > eventIdCounter){
        console.log("Не е намерено събитие с такъв номер.");
        return;
    }

    var index = Events.id.indexOf(eventId);
    console.log("Event " + Events.id[index] + ": " + Events.name[index] + ". " + checkAccess(Events.access[index]));
};

//3. Изтрива събитие по уникален идентификатор, и извежда съобщение за успешно извършена операция.

var  deleteEvent = function(eventId){
    if(isNaN(eventId)){
        console.log("Моля въвете число.");
        return;
    }
    if(eventId > eventIdCounter){
        console.log("Не е намерено събитие с такъв номер.");
        return;
    }
    for(var i=0; i<Events.id.length; i++) {
        var event = Events.id[i];
        var eventName = Events.name[event]
        if (eventId == Events.id[i]){
            Events.id.splice(i,1);
            Events.name.splice(i,1);
            Events.access.splice(i,1);
            Events.attendants.splice(i,1);
        }
        
    }
    console.log("Събитието беше изтрито.");
};



// //4. Създава ново събитие. Задължителни атрибути на събитието са неговото име.
// //Ако потребителя не подаде флаг, указващ дали събитието е подходящо за непълнолетни то по подразбиране е.

var eventIdCounter = 0;

var createEvent = function(eventName, isForAdults){
    if(eventName == null){
        console.log("Моля въведете име на събитието");
        return;
    }
    
    eventIdCounter++;
    Events.id[Events.id.length] = eventIdCounter;
    Events.name[Events.name.length] = eventName;
    Events.attendants[Events.attendants.length]= [""];

    if(isForAdults != true){
        Events.access[Events.access.length] = false;
        console.log("Събитието е добавено. Номер: " + Events.id[Events.id.length - 1]);
        return;
    }
    
    Events.access[Events.access.length] = isForAdults;
    console.log("Събитието е добавено. Номер: " + Events.id[Events.id.length - 1]);
}



var checkAccess = function(value){
    if(value){
        return "Събитието е с възрастово ограничение!";
    }
    else{
        return "Събитието е без възрастово ограничение!";
    }
};

createEvent("СканкаУ в клуб W",            true);
createEvent("Гери-Никол в Сикретс",        false);
createEvent("Баку Илия в  Мегами",         true);
createEvent("Фики в мол Плаза",            true);
createEvent("Групава оргия пред общината", false);
createEvent("Еминем в летния театър",      false);

