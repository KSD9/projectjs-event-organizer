//1. 
var Events = {
    id: [],
    name: [],
    access: [],
    attendants: []
};

//2. 
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

    
    console.log("Event " + Events.id[eventId] + ": " + Events.name[eventId] + ". " + checkAccess(Events.access[eventId]));
};

//3. 

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
        var name = Events.name[event]
        if (eventId == Events.id[i]){
            Events.id.splice(i,1);
            Events.name.splice(i,1);
            Events.access.splice(i,1);
            Events.attendants.splice(i,1);
        }
        
    }
    console.log("Събитието беше изтрито.");
};



// //4. 

var eventIdCounter = 0;

var createEvent = function(name, isForAdults){
    if(eventsAddingShutdown){
        console.log("Системата е затворена");
        return;
    }

    if(name == null){
        console.log("Моля въведете име на събитието");
        return;
    }
    
    eventIdCounter++;
    Events.id[Events.id.length] = eventIdCounter;
    Events.name[Events.name.length] = name;
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

// 5.
var updateEventInfo = function(eventId, name, isForAdults){

    if(isNaN(eventId)){
        console.log("Моля въвете число.");
        return;
    }
    if(eventId > eventIdCounter){
        console.log("Не е намерено събитие с такъв номер.");
        return;
    }

    Events.id[eventId] = eventId;
    Events.name[eventId] = name;
    Events.access[eventId] = isForAdults;
    console.log("Евентът е променен");
    printEventInfo(eventId);
};

var Attendants = {
    id: [],
    name: [],
    gender: [],
    age: []
};

var idCounter = 0;

var createAttendant = function(attendantName, gender, age){

    if(attendantsAddingShutdown){
        console.log("Системата е затворена");
        return;
    }
    if(attendantName == null || gender == null || age == null || typeof attendantName != "string" || (gender != "female" && gender != "male") || isNaN(age) || age < 0){ 
        console.log("Моля въведете правилни данни");
        return;
    }

    idCounter++;
    Attendants.id[Attendants.id.length] = idCounter;
    Attendants.name[Attendants.name.length] = attendantName;
    Attendants.gender[Attendants.gender.length] = gender;
    Attendants.age[Attendants.age.length] = age;    

    console.log("Посетителят е създаден");
}; 

//6. 

var addAttendantToEvent = function(eventId, attendantId){
    if(Events.id[eventId] < 0){
        console.log("няма евент с такъв номер");
        return;
    }

    if(Attendants.id[attendantId] < 0){
        console.log("няма евент с такъв номер");
        return;
    }

    

    if(Attendants.age[attendantId] < 18  && Events.access[eventId]){
        console.log("Посетителят няма нужните години за да присъства на събитието");
        return;
    }

    
    Events.attendants[eventId][Events.attendants[eventId].length] = Attendants.id[attendantId];
    console.log(Attendants.name[attendantId] + " Ще присъства на : " + Events.name[eventId] + ".");

};

var printAttendantInfo = function(attendantId){
    if(isNaN(attendantId)){
        console.log("Моля въведете правилни данни");
        return;
    }
    if(attendantId > Attendants.id[Attendants.id.length - 1]){
        console.log("Няма такъв посетител");
        return;
    }

    console.log(Attendants.name[attendantId] + ", " + Attendants.gender[attendantId] + " , " + Attendants.age[attendantId] + " г.");
};

var printAllAttendants = function(){
    for(var i = 0; i < Attendants.id.length; i++){
        printAttendantInfo(Attendants.id[i]);
    }
};


//7. 

var showAttendantsAtEvent = function(eventId, gender){
    

    if(eventId < 0){
        console.log("Няма такъв евент");
        return;
    }

    if(gender == null){
        console.log("Всички посетители които ще ходят на евента са: " + Events.name[eventId] + " are: ");

        for(var i = 0; i < Events.attendants[eventId].length; i++){
            printAttendantInfo(Events.attendants[eventId][i]);
        }
    }
    else if(gender == "female" || gender == "male"){
        console.log( gender + " посетители които ще ходят на евента са : " + Events.name[eventId] + " are: ");

        for(var i = 0; i < Events.attendants[eventId].length; i++){
            if(gender != Attendants.gender[Attendants.id.indexOf(Events.attendants[eventId][i])]){
                printAttendantInfo(Events.attendants[eventId][i]);
            }
        }
    }
    else{
        console.log("Невалидни данни");
    }

};

//8. 

var removeAttendantFromEvent = function(eventId, attendantId){

    if(isNaN(eventId) || isNaN(attendantId)){
        console.log("Невалидни данни");
        return;
    }

   
    if(eventId < 0){
        console.log("Няма такъв евент");
        return;
    }

    Events.attendants[eventId].pop();
    console.log("Посетителят " + Attendants.name[attendantId] + " е премахнат от : " + Events.name[eventId] + ".");
    
};






createEvent("СканкаУ в клуб W",            true);
createEvent("Гери-Никол в Сикретс",        false);
createEvent("Баку Илия в  Мегами",         true);
createEvent("Фики в мол Плаза",            true);
createEvent("Групава оргия пред общината", false);
createEvent("Еминем в летния театър",      false);



createAttendant("Иван Иванов",   "male", 15);
createAttendant("Стилиан Петров",    "male",   23);
createAttendant("Станимира Краева",  "female", 15);
createAttendant("Петър Тумбев",    "male",   23);
createAttendant("Анелия Караиванова",   "female", 15);
createAttendant("Петко Георгиев",    "male",   23);


addAttendantToEvent(1,1);
addAttendantToEvent(2,2);
addAttendantToEvent(4,3);
addAttendantToEvent(1,4);
addAttendantToEvent(2,5);
addAttendantToEvent(4,5);

// Бонус задачи 1

//1. 

var eventsAddingShutdown = false;
var attendantsAddingShutdown = false;

var closeSystem = function(systemIsClosed, model){
    if(typeof systemIsClosed !== "boolean" || (model != 'events' && model != 'attendants')){
        console.log("Моля въведете правилни данни. true, false за достъп до системата и 'events' или 'attendants' за модела.");        
        return;        
    }
    
    if(model == 'events'){

        eventsAddingShutdown = true;
        console.log("Системата е затворена за добавяне на нови евенти");
    }
    else if(model == 'attendants'){
        attendantsAddingShutdown = true;
        console.log("Системата е затворена за добавяне на нови посетители");
    }
}

//2

Events.date = [];

var addDateToEvent = function(eventId, date){

    var eventDate = new Date(date);

    if(Events.id[eventId] < 0 || eventDate == "Invalid Date" ){
        console.log("Моля въведете правилни данни \n форматът на датата трябва да е : yyyy/mm/dd.");
        return;
    }

    if(Events.date[Events.id[eventId]] != undefined){
        console.log("Евентът вече има дата");
        return;
    }

    if(eventDate < new Date()){
        console.log("Не може да бъде записана по-стара дата от текущата");
        return;
    }
    
    Events.date[Events.id[eventId]] = new Date(eventDate);
    console.log("Датата на евент номер: " + eventId + " е добавена успешно.");

};

addDateToEvent(2, "2019/10/05");
addDateToEvent(5, "2019/02/17");