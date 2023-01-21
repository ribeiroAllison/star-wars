const baseURL = 'https://swapi.dev/api/';


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
    const randomChar = charArray[charWithTraits[randomIndex]];
    randomChar.id = charArray.indexOf(randomChar);

    const shotFirst = () =>{
        const shotVariable = document.getElementsByClassName('radio');
        for (option of shotVariable){
            if (option.checked){
                return option.value;
            }
        }
    };

    const shot = shotFirst();

    if(shot === 'yes'){
        charArray[13].id = 13;
        return charArray[13];
    } else if(charWithTraits.length === 0){
        return 'Character Not Found!';
    } else{
        return randomChar;
    }
}


async function run() {
    
    const char = await getCharByTraits();

    //creating the picture div content
    const resultsDiv = document.getElementById('results');
    const pictureDiv = document.getElementById('img');
    const pictureUrl = `./resources/img/${char.id}.jpg`
    const picture = document.createElement('img');
    picture.setAttribute('src', pictureUrl);
    pictureDiv.appendChild(picture);

    //creating size div content
    const infoDiv = document.getElementById('info');
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



}

async function showObject () {
    const data = await joinArrays();
    console.log(data);
}

const button = document.getElementById('button');

button.addEventListener('click', run);

