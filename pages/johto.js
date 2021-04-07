import axios from 'axios';
import Layout from '../components/Layout';
import PokemonsGrid from '../components/PokemonsGrid';

export default function Home({pokemons}) {

  return (
    <Layout title='Pokenext!'>
      <PokemonsGrid pokemons={pokemons} />
    </Layout>
  )
}

export async function getStaticProps() {
    try {
      const {results} = await axios('https://pokeapi.co/api/v2/pokemon?offset=151&limit=100').then(r => r.data);
      const pokemons = results.map((pokemon, index) => {
        const pokeIndex = index + 152;
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeIndex}.png`
  
        return {
          ...pokemon,
          index: pokeIndex,
          image
        }
      });
  
      return {
        props: {pokemons}
      }
  
    } catch (err) {
      console.log(err);
    }
    
}