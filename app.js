"use strict"
let people = data;

//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTrait(people);
      break;
      default:
      app(people); // restart app
      break;
        
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
    mainMenu(searchResults, people);


// Menu function to call once you find who you are looking for
    function mainMenu(person, people) {
  

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);
  
  switch(displayOption){
    case "info":
    displayPerson(person, people);
    mainMenu(person, people);
    break;
    
    case "family":
    displayParent(person,people);
    mainMenu(person, people);
    // TODO: get person's family
    break;
    case "descendants":
    
    // TODO: get person's descendants
    break;
    case "restart":
    app(person, people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  // alert(foundPerson);
  return foundPerson[0]
}


//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let chosenEyeColor = promptFor("what is their eye color?", autoValid);

  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === chosenEyeColor){
      return true;
    }
    else{
        return false;
    }
  })
    return foundPeople
}


function searchByOccupation(people){
  let occupation = promptFor("What is the occupation?", autoValid);
  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPeople
}

function searchByGender(people){
  let gender = promptFor("What is the gender?", autoValid);
  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.gender === gender){
      return true;
    }
    else{
    return false;
    }
  })
  return foundPeople
}
function searchByWeight(people){
  let weight = promptFor("what weight do you want to search for?",autoValid);

  let foundPeople = people.filter(function(potentialMatch){
    if (potentialMatch.weight==weight){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPeople
}


function searchByHeight(people){
  let height = promptFor("what height are you looking for? in inches?", autoValid);

  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.height==height){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPeople
}


//TODO: add other trait filter functions here.


//let tempPeople = people // 100

//tempPeople = searchByEyeColor(tempPeople)
//tempPeople = searchByGender(tempPeople)

//if (tempPeople.length > 1) {
  //displayPeople(tempPeople)
//} else if (tempPeople.length === 1 ) {
 // displayPerson(tempPeople[0])
//} else { 
  // nodata 
//}

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender" + person.gender + "\n";
  personInfo += "Height" + person.height +"\n";
  personInfo += "Weight" + person.weight + "\n";
  personInfo += "Eyecolor" +person.eyeColor + "\n";
  personInfo += "Occupation" + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo); 
}
function displayParent(person){
  let foundPeople = people.filter(function(el){
    if(el.id=== person.parents [0] || el.id === person.parents[1]){
      return true;
    }
    else{
      return false;

  }})
  alert(foundPeople)
}

function searchByTrait(people){
  let resultTrait = people;
  do{
    let searchTrait = promptFor('What trait would you like to search?  Gender,Height,Weight,Eyecolor,Occupation',autoValid).toLowerCase();
    switch(searchTrait){
      case 'gender':
        resultTrait = searchByGender(resultTrait)
        displayPeople(resultTrait);
          break;
        case 'weight':
        resultTrait = searchByWeight(resultTrait);
        displayPeople(resultTrait);
          break;
      case 'eyecolor':
        resultTrait = searchByEyeColor(resultTrait);
        displayPeople(resultTrait);
          break;
      case "height":
        resultTrait = searchByHeight(resultTrait);
        displayPeople(resultTrait);
          break;  
      case "occupation":
        resultTrait = searchByOccupation(resultTrait);
        displayPeople(resultTrait);
          break;
      case 'age':
        resultTrait = searchByAge(resultTrait);
        displayPeople=(resultTrait)
      default:
    }
  }
  while(resultTrait.length > 1);
  return resultTrait
}}

// function displayParent(person, people){
// let personID = person.id;
// let perParent = [];
// perParent = person.parents
// let foundPerson = people.filter(function(el){
//   let elParent = el.id
//   if(el.currentSpouse === personID || el.parents.includes(personID)|| elParent === perParent[0]|| elParent === perParent[1] ){
//     return true;
//   }
//   else{
//     return false;
//   }
// })
//   alert(foundPerson)}


//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion