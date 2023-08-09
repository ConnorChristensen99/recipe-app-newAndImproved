import './App.css';
import { FaSearch } from "react-icons/fa";

function App() {
  // CALLS THE RECIPE FUNCTION IF WE PRESS ENTER
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getRecipes()
    }};
    // FUNCTION TO GET RECIPES ON SEARCH
  async function getRecipes() {
    let searchedRecipe = document.getElementById('search').value
    console.log(searchedRecipe)

    fetch(`https://api.spoonacular.com/recipes/search?query=${searchedRecipe}&apiKey=592c176aa0f74669aacd253abca7bcbc`)
      .then(response => response.json())
      .then(data => console.log(data));
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>WheatRecipes</h1>
        <input type='text' placeholder='Find a Recipe...' id='search' className='recipeFinderSearch' onKeyDown={handleKeyDown}/>
        <FaSearch className='searchIcon' onClick={getRecipes}/>
      </header>
    </div>
  );
}

export default App;
