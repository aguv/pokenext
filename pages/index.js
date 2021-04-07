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

export async function getStaticProps(context) {
  try {
    const {results} = await axios('https://pokeapi.co/api/v2/pokemon?limit=151').then(r => r.data);
    const pokemons = results.map((pokemon, index) => {
      const paddedIndex = ('00' + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`

      return {
        ...pokemon,
        index: index + 1,
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