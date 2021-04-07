import Pokewindow from '../components/Pokewindow';
import {useState} from 'react';

export default function Home({pokemons}) {
  const [pokes, setPokes] = useState(pokemons)

  const handleRenderAfterRemove = (index) => {
    setPokes(pokes => pokes.filter(poke => poke.index !== index));
  }

  return (
      <div>
        <div className='flex justify-center'>
          <h1 className='text-4xl mb-8'>PokeNEXT!</h1>
          <img 
            src='/pokeball.svg' 
            alt='pokeball'
            className='h-10 w-10 ml-3'
          />
        </div>
        <ul className='md:flex md:flex-wrap justify-around'>
          {pokes.map((pokemon) => (

            <Pokewindow pokemon={pokemon} key={pokemon.index} handleRenderAfterRemove={handleRenderAfterRemove}/>
          ))}
        </ul>
      </div>
  )
}
