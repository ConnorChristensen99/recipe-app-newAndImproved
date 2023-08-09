import './App.css';
import { FaSearch } from "react-icons/fa";
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
    console.log('displaying Recipes!')
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
  useEffect(() => {
    displayRecipes();
  }, []);



  return (
    <div className="App">
      <header className="App-header">
        <h1>WheatRecipes</h1>
        <input type='text' placeholder='Find a Recipe...' id='search' className='recipeFinderSearch' onKeyDown={handleKeyDown}/>
        <FaSearch className='searchIcon' onClick={getRecipes}/>
      </header>
      <main>
        <div className='recipeMain' id='recipeMain'></div>
        <button href="#me" onClick={moveLimit} id='me' className='loadMoreBtn'>Load More Recipes</button>
      </main>
    </div>
  );
}

export default App;

