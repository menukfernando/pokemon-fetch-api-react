import { useState, useEffect } from "react"

function App() {
  const [pokemonName, setPokemonName] = useState("")
  const [allNames, setAllNames] = useState("")
  const [pokemonData, setPokemonData] = useState(null)

  const handleInputChange = (event) => {
    setPokemonName(event.target.value.toLowerCase())
  }

  const handleFetchPokemon = () => {
    if (pokemonName) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => setPokemonData(data))
        .catch((error) => {
          console.error("Error fetching the Pokémon data:", error)
          setPokemonData(null)
        })
    }
  }

  useEffect(() => {
    if (!pokemonName) {
      setPokemonData(null)
    }
  }, [pokemonName])

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => response.json())
      .then((data) => {
        const items = data.results.map(pokemon => <ul><li style={{listStyle: "none", marginRight: "30px"}}>{pokemon.name}</li></ul>)
        setAllNames(items)
      })
  })

  return (
    <div style={styles.container}>
      <h1>Pokémon Search</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={pokemonName}
          onChange={handleInputChange}
          placeholder="Enter Pokémon name"
          style={styles.input}
        />
      </div>
      <button onClick={handleFetchPokemon} style={styles.button}>
        Search
      </button>
      {pokemonData && (
        <div style={styles.pokemonCard}>
          <h2>
            {pokemonData.name.charAt(0).toUpperCase() +
              pokemonData.name.slice(1)}
          </h2>
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            style={styles.pokemonImage}
          />
        </div>
      )}
      <div style={styles.text}>
        {allNames}
      </div>
    </div>
  )
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
  },
  inputContainer: {
    display: "inline-block",
    width: "300px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    marginLeft: "10px",
  },
  pokemonCard: {
    marginTop: "20px",
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    width: "300px",
    margin: "20px 40%",
    position: "absolute",

  },
  pokemonImage: {
    width: "150px",
  },

  text: {
    textAlign: "left",
    position: "absolute",
    marginTop: "-9vh",
    marginLeft: "400px",
    border: "1px solid black",
    padding: "20px",
    fontSize: "18px",
    borderRadius: "5px",
    backgroundColor: "black",
    opacity: "85%",
    color: "white",
    boxShadow: "2px 2px 10px grey"
  }
}

export default App
