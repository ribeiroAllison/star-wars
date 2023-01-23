const baseURL = 'https://swapi.dev/api/'; 
const resultsDiv = document.getElementById('results'); //parent div for info, picture and status divs
const infoDiv = document.getElementById('info'); // div that will store the information about the character
const statusDiv = document.getElementById('status'); //div that will provide a loading screen while main function is running
const pictureDiv = document.getElementById('img'); // div that will store the picture of selected character



//function to extract from API all characters objects
const getPeopleList =  async () =>{
    const peopleEndPoint = 'people/';
    let charList = [];
    for(let i = 1; i < 10; i++){ //since there are 9 pages of characters this loop is required
        
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
    
    return charList; //array with all 9 pages worth of charaters objects, however each page is store in its own child array
}


//function to make previous output of charList into a single array containing all character objects.
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


// Function to select the character from previous array that meets the criteria set by user
async function getCharByTraits () {
    const charArray = await joinArrays();
    let charWithTraits = [];
    const eye_color = document.getElementById('eyeColor').value;
    const height = document.getElementById('height').value;
    for (char of charArray){ //iterate through full object array and extract the index of characters that meet the criteria, than push this index into a new array charWithtraits
        if(char.eye_color === eye_color && Number(char.height) > height){
            charWithTraits.push(charArray.indexOf(char));

        }
    }
    
    // select from charWithTraits a random element to be the final character
    const randomIndex = Math.floor(Math.random() * charWithTraits.length);
    let randomChar = charArray[charWithTraits[randomIndex]];
    if(charWithTraits.length !== 0){
        randomChar.id = charArray.indexOf(randomChar); // this id will be used to select the right picture from resources
    }
    
     
    
    const shotFirst = () =>{ //function that returns the value of which "Shot First?" slot is checked. 
        const shotVariable = document.getElementsByClassName('radio');
        for (option of shotVariable){
            if (option.checked){
                return option.value;
            }
        }
    };

    const shot = shotFirst();
    const nullChar = { // an object to be used in case no character matches are found. 
        id: 82,
        name: 'Character not Found!',
        eye_color: 'N/A',
        height: 'N/A'

    }

    
    if(shot === 'yes'){ // select the final character to be displayed 
        charArray[13].id = 13;
        return charArray[13];
    } else if(charWithTraits.length === 0){
        randomChar = nullChar;
        return randomChar;
    } else{
        return randomChar;
    }
}

//function that provides a loading screen while main function is running
function waitStatus () {
    const status = document.createElement('h3');
    status.innerHTML = ' searching...'
    statusDiv.appendChild(status);
    if(!infoDiv.firstChild){ // display if there are no children to info div, otherwise hide
      statusDiv.style.display = 'block';
    } else{
        statusDiv.style.display = 'none';
    }
  }

// final function that handles the delivery and display of information
async function run() { 

    //delete children from previous searches (if any)
    while(infoDiv.firstChild){
        infoDiv.removeChild(infoDiv.firstChild);
    }

    while(pictureDiv.firstChild){
        pictureDiv.removeChild(pictureDiv.firstChild);
    }

    while(statusDiv.firstChild){
        statusDiv.removeChild(statusDiv.firstChild);
    }

    waitStatus(); // display loading screen
    
   
    const char = await getCharByTraits(); // get charByTrait array with indexes of char matches
    
    

    //creating the picture div content
    const pictureUrl = `./resources/img/${char.id}.jpg`
    const picture = document.createElement('img');
    picture.setAttribute('src', pictureUrl);

    pictureDiv.appendChild(picture);

    //creating info div content
    const name = document.createElement('h2');
    name.innerHTML = `${char.name}`;
    const height = document.createElement('h3');
    height.innerHTML = `Heigth: ${char.height} cm`;
    const eye = document.createElement('h3');
    eye.innerHTML = `Eye Color: ${char.eye_color}`;

    infoDiv.appendChild(name);
    infoDiv.appendChild(height);
    infoDiv.appendChild(eye);
    resultsDiv.style.border = '3px dotted yellow';

    waitStatus(); // hide loading screen

    



}


const button = document.getElementById('button');

button.addEventListener('click', run);

