import { avg_danger, danger, getCallRecords, getObjPeople, getObjTRANSCRIPTIONS, getPeopleList, name_danger, searchPeopleByage, searchPeopleByName, three_danger, writePeopleList } from "./utils/utils.js";



let connected = true
while(connected){
    console.log(`
Get People List = 1
Get Call Records/Transcriptions = 2
Search People by Name = 3
Search People by Age = 4
Find Dangerous People = 5
EXIT = 6
        `);
    const click = input(``)
    switch(click){
        case '1':

            break;
        case '2':

            break;
        case '3':

            break;
        case '4':

            break;
        case '5':

            break;            
        case '6':
            connected = false
            break;
        default:
            console.log(`Type a valid value between 1 and 6.`);
    }
}

