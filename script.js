const baseURL = 'https://swapi.dev/api/';
const infoDiv = document.getElementById('info');
const statusDiv = document.getElementById('status');
const resultsDiv = document.getElementById('results');
const pictureDiv = document.getElementById('img');



const getPeopleList =  async () =>{
    const peopleEndPoint = 'people/';
    let charList = [];
    for(let i = 1; i < 10; i++){
        
        const requestParams = `?page=${i}`;
        const urlToFetch = `${baseURL}${peopleEndPoint}${requestParams}`;

        try{
            const response = await fetch(urlToFetch);
            if(response.ok){
                let jsonResponse = await response.json();
                let charData = jsonResponse.results;
                charList.push(charData);
                
                
            }

        } catch(error){
            console.log(error);
        }
        

    }
    
    return charList;
}


async function joinArrays() {
    const data = await getPeopleList();
    let unifyArray = [];
    for(let i = 0; i < 9; i++){
        for(let j=0; j < data[i].length; j++){
            unifyArray.push(data[i][j]);
        }
        
    }
    return unifyArray;
}


async function getCharByTraits () {
    const charArray = await joinArrays();
    let charWithTraits = [];
    const eye_color = document.getElementById('eyeColor').value;
    const height = document.getElementById('height').value;
    for (char of charArray){
        if(char.eye_color === eye_color && char.height > height){
            charWithTraits.push(charArray.indexOf(char));

        }
    }
    
    const randomIndex = Math.floor(Math.random() * charWithTraits.length);
    let randomChar = charArray[charWithTraits[randomIndex]];
    if(charWithTraits.length !== 0){
        randomChar.id = charArray.indexOf(randomChar);
    }
    
     

    const shotFirst = () =>{
        const shotVariable = document.getElementsByClassName('radio');
        for (option of shotVariable){
            if (option.checked){
                return option.value;
            }
        }
    };

    const shot = shotFirst();
    const nullChar = {
        id: 83,
        name: 'Character not Found!',
        eye_color: 'N/A',
        height: 'N/A'

    }

    if(shot === 'yes'){
        charArray[13].id = 13;
        return charArray[13];
    } else if(charWithTraits.length === 0){
        randomChar = nullChar;
        return randomChar;
    } else{
        return randomChar;
    }
}

function waitStatus () {
    const status = document.createElement('h3');
    status.innerHTML = ' searching...'
    statusDiv.appendChild(status);
    if(!infoDiv.firstChild){
      statusDiv.style.display = 'block';
    } else{
        statusDiv.style.display = 'none';
    }
  }

async function run() {
    waitStatus();
    
   
    const char = await getCharByTraits();
    
    //delete children from previous searches (if any)
    while(infoDiv.firstChild){
        infoDiv.removeChild(infoDiv.firstChild);
    }

    while(pictureDiv.firstChild){
        pictureDiv.removeChild(pictureDiv.firstChild);
    }

    //creating the picture div content
    const pictureUrl = `./resources/img/${char.id}.jpg`
    const picture = document.createElement('img');
    picture.setAttribute('src', pictureUrl);

    pictureDiv.appendChild(picture);

    //creating size div content
    const name = document.createElement('h2');
    name.innerHTML = `${char.name}`;
    const height = document.createElement('h3');
    height.innerHTML = `Heigth: ${char.height}`;
    const eye = document.createElement('h3');
    eye.innerHTML = `Eye Color: ${char.eye_color}`;

    infoDiv.appendChild(name);
    infoDiv.appendChild(height);
    infoDiv.appendChild(eye);
    resultsDiv.style.border = '3px dotted yellow';

    waitStatus();

    



}

// async function showObject () {
//     const data = await joinArrays();
//     console.log(data);
// }

const button = document.getElementById('button');

button.addEventListener('click', run);

