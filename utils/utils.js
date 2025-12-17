import fs from 'fs/promises'
import { json } from 'stream/consumers'
import input from 'analiza-sync'


const url = 'https://spiestestserver-onjv.onrender.com/'

export async function getPeopleList(){
    try{
    const res = await fetch(`${url}people`)
    const data = await res.text()
    return data       
    }
    catch(err){
        console.log('ERR: ',err.message)
    }
}
const peopleList = await getPeopleList()

export async function writePeopleList(){
    try{
        await fs.writeFile('PEOPLE.json',peopleList,'utf8' );
    }
    catch(err){
        console.log(`ERR: `,err.message)
    }
}
writePeopleList()

export async function getCallRecords(){
    try{
    const res = await fetch(`${url}transcriptions`)
    const data = await res.text()
    return data       
    }
    catch(err){
        console.log('ERR: ',err.message)
    }
}
const recordsList = await getCallRecords()

export async function writerecordsList(){
    try{
        await fs.writeFile('TRANSCRIPTIONS.json',recordsList,'utf8' );
    }
    catch(err){
        console.log(`ERR: `,err.message)
    }
}
writerecordsList()

export async function getObjPeople(){
    try{
        const res = await fs.readFile('PEOPLE.json','utf8')
        const data = JSON.parse(res)
        return data
    }
    catch(err){
        console.log(`ERR: `,err)
    }

}
const obj_people = await getObjPeople()

export function searchPeopleByName(){
    const search = input(`Type a search name`)
    const findPerson = obj_people.find(person => person.name === search)
    if(findPerson !== undefined)
        console.log(findPerson)
    else
        console.log(`the person was not found`)
}
searchPeopleByName()

export function searchPeopleByage(){
    let search = input(`Type a search age`)
    if (Number.isNaN(Number(search))){
        console.log(`is not a number`)
        return
    }
    search = Number(search)
    const findPerson = obj_people.find(person => person.age === search)
    if(findPerson !== undefined)
        console.log(findPerson)
    else
        console.log(`the person was not found`)
}
searchPeopleByage()

export async function getObjTRANSCRIPTIONS(){
    try{
        const res = await fs.readFile('TRANSCRIPTIONS.json','utf8')
        const data = JSON.parse(res)
        return data
    }
    catch(err){
        console.log(`ERR: `,err)
    }

}
const obj_TRANSCRIPTIONS = await getObjTRANSCRIPTIONS()

export function danger(){
const danger_levels = []
    for(let i = 0; i<obj_TRANSCRIPTIONS.length;i++){
    const message = obj_TRANSCRIPTIONS[i]["content"].replace(/,/g).split(' ')
    let count = 0
        for (let j = 0; j<message.length;j++){
        if(message[j] === 'death' || message[j] === 'knife' || message[j] === 'bomb' || message[j] === 'attack'){
            count += 1
        }
    }
    if(count > 0){
    const index = danger_levels.findIndex(value => value.age === obj_TRANSCRIPTIONS[i].age)
    if (index === -1){
        danger_levels.push({
            age:obj_TRANSCRIPTIONS[i].age,
            messages:[count]})
    }
    else{
        danger_levels[index].messages.push(count)
    }        
    }
}
return danger_levels
}


export function avg_danger(danger_levels){
const avg_danger_levels = danger_levels.map((element) =>{
    let sum = 0
    element['messages'].forEach(num => sum += num)
    return {age:element['age'],avg:sum/element['messages'].length}
})
return avg_danger_levels    
}


export function three_danger(arr){
    const three_leaders = arr.toSorted((a,b) => b.avg - a.avg).slice(0,3)
return three_leaders 
}

export function name_danger(arr){
    const name_three_leaders = arr.map(value => {
        const name = obj_people.find(person => person.age === value.age)
        return name
    })  
    return name_three_leaders
}

