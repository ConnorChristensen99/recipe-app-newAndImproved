import './App.css';
import { FaSearch, FaBars } from "react-icons/fa";
import React, { useState, useEffect } from 'react';


function App() {
  const [limit, setLimit] = useState(10)
  const [btnType, setBtn] = useState(0)
  // const [btnType, setBtn] = useState(basicBtn)
  function moveLimit() {
    if (btnType == 0) {
      let recipeMain = document.getElementById('recipeMain')
      recipeMain.innerHTML = ""
      setLimit(limit + 10)
      getRecipes()
    } else if(btnType == 1) {
      let recipeMain = document.getElementById('recipeMain')
      recipeMain.innerHTML = ""
      setLimit(limit + 10)
      displayRecipes()
    }

    
    
  }
  // CALLS THE RECIPE FUNCTION IF WE PRESS ENTER
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setLimit(20)
      setBtn(0)
      getRecipes()
    }};
    // FUNCTION TO GET RECIPES ON SEARCH
  async function getRecipes() {
    setBtn(0)
    // GETS INPUT VALUE TO USE FOR SEARCH
    let searchedRecipe = document.getElementById('search').value
    let recipeMain = document.getElementById('recipeMain')
    recipeMain.innerHTML = ""
    let btn = document.getElementById('me')
      btn.style = 'display: block;'

    // SEARCHES FOR DESIRED RECIPE
    const response = await fetch(`https://api.spoonacular.com/recipes/search?query=${searchedRecipe}&number=${limit}&apiKey=592c176aa0f74669aacd253abca7bcbc`)
    const recipes = await response.json();

    console.log(recipes)

    if (recipes.totalResults > 0) {

      // CREATING THE INDIVIDUAL RECIPES
      let resultsFound = recipes.results
      resultsFound.forEach(result => {
        // IMAGE
        let resultImage = document.createElement('img')
        resultImage.classList.add('recipeImage')
        resultImage.src = `https://spoonacular.com/recipeImages/${result.image}`
        // READY IN
        let readyIn = document.createElement('p')
        readyIn.classList.add('readyInRecipe')
        readyIn.innerText = `Ready In: ${result.readyInMinutes} minutes`
        // SERVINGS
        let servings = document.createElement('p')
        servings.classList.add('recipeServings')
        servings.innerText = `Serves ${result.servings}`
        // READMORE
        let readMore = document.createElement('button')
        readMore.classList.add('readMoreRecipe')
        readMore.innerHTML = `<a href=${result.sourceUrl} class='recipeAnchor'> Read More about the Recipe</a>`
        // RECIPE NAME
        let name = document.createElement('p')
        name.classList.add('recipeName')
        name.innerText = result.title

        // PUTTING THEM TOGETHER IN DIVS AND ADDING CLASSES
        let newlyCreatedRecipeInformation = document.createElement('div')
        newlyCreatedRecipeInformation.classList.add('recipeIndiv-information')
        newlyCreatedRecipeInformation.append(name, readyIn, servings, readMore)
        // 
        let newlyCreatedRecipe = document.createElement('div')
        newlyCreatedRecipe.classList.add('recipeIndiv')
        newlyCreatedRecipe.append(resultImage, newlyCreatedRecipeInformation )

        // MAIN APPEND OF ALL ITEMS
        recipeMain.append(newlyCreatedRecipe)

      });
      let resultFound = document.createElement('h3')
      resultFound.classList.add('resultsHeader')
      resultFound.innerText = `Showing Recipes for "${searchedRecipe}"`
      recipeMain.append(resultFound)
    }else {

      // CANT FIND WHAT YOU WERE LOOKING FOR
      recipeMain.innerHTML = ""
      let cantFind = document.createElement('div')
      cantFind.classList.add('cantFind')
      let sorry = document.createElement('h3')
      sorry.classList.add('SORRY')
      sorry.innerHTML = `Sorry! We were not able to find any results for "<span class='searchedWrong'>${searchedRecipe}</span>".`

      let sorryExplanation = document.createElement('p')
      sorryExplanation.innerText = "Please try searching for another recipe or a broader term."

      cantFind.append(sorry, sorryExplanation)

      recipeMain.append(cantFind)
      let btn = document.getElementById('me')
      btn.style = 'display: none;'
    }

    
  }

  
  // FUNCTION TO DISPLAY RECIPES ON APP LOAD
  async function displayRecipes() {
    let recipeMain = document.getElementById('recipeMain')
    recipeMain.innerHTML = ""
    let btn = document.getElementById('me')
      btn.style = 'display: block;'
    // SEARCHES A BASIC LIST TO START OFF WITH
    const response = await fetch(`https://api.spoonacular.com/recipes/search?query=all&number=${limit}&apiKey=592c176aa0f74669aacd253abca7bcbc`);
    const recipes = await response.json();
    // CREATING THE INDIVIDUAL RECIPES
      let resultsFound = recipes.results
      resultsFound.forEach(result => {
        // IMAGE
        let resultImage = document.createElement('img')
        resultImage.classList.add('recipeImage')
        resultImage.src = `https://spoonacular.com/recipeImages/${result.image}`
        // READY IN
        let readyIn = document.createElement('p')
        readyIn.classList.add('readyInRecipe')
        readyIn.innerText = `Ready In: ${result.readyInMinutes} minutes`
        // SERVINGS
        let servings = document.createElement('p')
        servings.classList.add('recipeServings')
        servings.innerText = `Serves ${result.servings}`
        // READMORE
        let readMore = document.createElement('button')
        readMore.classList.add('readMoreRecipe')
        readMore.innerHTML = `<a href=${result.sourceUrl} class='recipeAnchor'> Read More about the Recipe</a>`
        // RECIPE NAME
        let name = document.createElement('p')
        name.classList.add('recipeName')
        name.innerText = result.title

        // PUTTING THEM TOGETHER IN DIVS AND ADDING CLASSES
        let newlyCreatedRecipeInformation = document.createElement('div')
        newlyCreatedRecipeInformation.classList.add('recipeIndiv-information')
        newlyCreatedRecipeInformation.append(name, readyIn, servings, readMore)
        // 
        let newlyCreatedRecipe = document.createElement('div')
        newlyCreatedRecipe.classList.add('recipeIndiv')
        newlyCreatedRecipe.append(resultImage, newlyCreatedRecipeInformation )

        // MAIN APPEND OF ALL ITEMS
        recipeMain.append(newlyCreatedRecipe)

        
      });
  }
  // HANDLES THE CONVERT BUTTON POPUP
  function showConvert() {
    let convertBox = document.getElementById('convertBox')
    if (convertBox.classList.contains('invisible')) {
      convertBox.classList.remove('invisible')
    } else {
      convertBox.classList.add('invisible')
    }
  }
  function hideConvert() {
    let convertBox = document.getElementById('convertBox')

    if (convertBox.classList.contains('invisible')) {
      convertBox.classList.remove('invisible')
    } else {
      convertBox.classList.add('invisible')
    }
  }
  // HANDLES THE ACTUAL CONVERSION OF THE BUTTONS
    async function makeConversion() {
        let ingredient = document.getElementById('convertText').value
        let amount = document.getElementById('convertNumber').value
        let measure1 = document.getElementById('measurementBefore').value
        let measure2 = document.getElementById('measurementAfter').value
        
        const response = await fetch(`https://api.spoonacular.com/recipes/convert?ingredientName=${ingredient}&sourceAmount=${amount}&sourceUnit=${measure1}&targetUnit=${measure2}&apiKey=592c176aa0f74669aacd253abca7bcbc`);
        const conversion = await response.json();

        console.log(conversion)
        let answerDOM = document.getElementById('convertBox')
        let answer = conversion.answer

       let newSpan = document.createElement('span')
       newSpan.innerText = answer
       newSpan.classList.add('answerConversion')

        console.log(newSpan)
       answerDOM.append(newSpan)
    }
        



  useEffect(() => {
    displayRecipes();
  }, []);



  return (
    <div className="App">
      <header className="App-header">
        <h1>WheatRecipes</h1>
        <input type='text' placeholder='Find a Recipe...' id='search' className='recipeFinderSearch' onKeyDown={handleKeyDown}/>
        <FaSearch className='searchIcon' onClick={getRecipes}/>
        <button className='convertButton' onClick={showConvert}>Convert</button>
      </header>
      <main>
        <div className='recipeMain' id='recipeMain'></div>
        <button href="#me" onClick={moveLimit} id='me' className='loadMoreBtn'>Load More Recipes</button>
      </main>


      {/* CONVERT DIALOGUE BOX */}
      <div className='convertBoxContainer'>
      <div className='convertBox invisible' id='convertBox'>
        <FaBars className='bars' onClick={hideConvert}/>
        <h2 className='h3Padding'>Convert Ingredients</h2>
        <label>Enter Ingredient:</label>
        <input type='text' id='convertText' className='convertText' placeholder='Flour'/><br/>
        <label>Enter Amount:</label>
        <input type='text' id='convertNumber' className='convertText' placeholder='3.5'/><br/>
        <div className='measureMentt'>
        <select name="measurementBefore" id="measurementBefore" className='measureMent'>
          <option option value="Tablespoon">Tablespoon(s)</option>
          <option value="Ounce">Ounce(s)</option>
          <option value="Cup">Cup(s)</option>
          <option value="Pint">Pint(s)</option>
          <option value="Quart">Quart(s)</option>
          <option value="Gallon">Gallon(s)</option>
        </select>
        <span class='label'>To:</span>
        <select name="measurementAfter" id="measurementAfter" className='measureMent'>
        <option option value="Tablespoon">Tablespoon(s)</option>
          <option value="Ounce">Ounce(s)</option>
          <option value="Cup">Cup(s)</option>
          <option value="Pint">Pint(s)</option>
          <option value="Quart">Quart(s)</option>
          <option value="Gallon">Gallon(s)</option>
        </select>
        </div>
        <div className='convertBtnContainer'>
        <button className='convertBtn' onClick={makeConversion}>Convert</button>
        </div>
      </div>
      </div>
      {/* END CONVERT DIALOGUE BOX */}

    </div>
  );
}

export default App;

