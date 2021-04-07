import React from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useSession } from "next-auth/client";
import { useRouter } from 'next/router'
import axios from 'axios';

const Pokewindow = ({pokemon, handleRenderAfterRemove}) => {
    const [session, loading] = useSession();
    const router = useRouter();

    const handleAddFavorite = pokemon => {
        axios.put(`/api/users/${+session.user.id}`, pokemon)
            .then(r => r.data)
            .then(data => console.log(data))
            .catch(e => console.log(e));
    }

    const handleDeleteFavorite = pokemon => {
        axios.post(`/api/users/${+session.user.id}`, {index: pokemon.index})
            .then(r => r.data)
            .then(_ => handleRenderAfterRemove(pokemon.index))
            .catch(e => console.log(e))
    }

    return (
        <li className='md:w-5/12 xl:w-3/12'>
            {session && router.pathname !== '/profile' ? 
                <button className='absolute hover:text-yellow-400 w-4 h-4 mt-3 ml-3' onClick={() => handleAddFavorite(pokemon)}>
                    <FontAwesomeIcon icon={faStar} />
                </button>
                :
                null
            }
            {router.pathname === '/profile' ?
                <button className='absolute hover:text-yellow-400 w-4 h-4 mt-4 ml-3' onClick={() => handleDeleteFavorite(pokemon)}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </button>
                :
                null
            }
            <Link href={`/pokemon?id=${pokemon.index}`}>
                <a className='border p-4 shadow-md hover:bg-gray-300 rounded-md border-gray m-2 capitalize flex items-center justify-center text-lg bg-gray-200'>
                  <img className='w-20 h-20 mr-10' src={pokemon.image} alt={pokemon.name}/>
                  <span className='mr-2 font-bold'>{pokemon.index}.</span>
                  {pokemon.name}
                </a>
            </Link>
        </li>
    )
}

export default Pokewindow
