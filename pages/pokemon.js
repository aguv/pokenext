import React from 'react'
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Pokemon = ({pokeman}) => {   
    if(pokeman.message) return <div>Error</div>;

    function capitalize(s) {
        return s && s[0].toUpperCase() + s.slice(1);
    }   

    const getKg = (w) => {
        let ws = w.split('');
        ws.splice(ws.length - 1, 0, ',')
        ws = ws.join('');
        return `${ws}kg.`
    }

    const getMeters = (h) => {
        if(h && h.length == 1) return `0,${h}m.`
        else if(h.length > 1) {
            let hs = h.split('');
            hs.splice(hs.length - 1, 0, ',');
            hs = hs.join('');
            return `${hs}m.`;
        }

        throw new Error('Check your input!')
    }


    return (
        <div className='bg-red-300 min-h-screen'>
            <Head>
                <title>{capitalize(pokeman.name)}</title>
                <link rel='icon' href='/favicon.ico'/>
            </Head>
            <Navbar />
            <main className='container mt-10 mx-auto md:w-7/12 lg:w-5/12 p-8 bg-red-400 rounded-md border-solid border-4 border-gray-600'>
                <div className='2xl:flex'>
                    <img className="mx-auto mb-6 2xl:mb-0 w-5/12 h-4/12 border-solid border-4 border-gray-600 w-5/12 h-4/12 rounded-md bg-gray-200" src={pokeman.image} alt={pokeman.name} />
                    <div className='flex-grow 2xl:ml-10 divide-y-2 divide-gray-400 bg-gray-300 p-2 rounded-md shadow-lg border-solid border-4 border-gray-600'>
                        <h1 className="text-4xl mb-2 text-center capitalize">
                            {pokeman.id}. {pokeman.name}
                        </h1>
                        <p className='bg-red-200'>
                            <span className="font-bold mr-2">Weight:</span> {getKg(`${pokeman.weight}`)}
                        </p>
                        <p>
                            <span className="font-bold mr-2">Height:</span> {getMeters(`${pokeman.height}`)}
                        </p>
                        <p className='bg-red-200'>
                            <span className="font-bold mr-2">Stats:</span>
                        </p>
                        <ul className='md:ml-16'>
                        {pokeman.stats.map((stat, index) => (
                            <li key={index} className='text-left'>
                                <span className='font-bold mr-2'>{stat.stat.name.toUpperCase()}:</span> {stat.base_stat}.
                            </li>
                        ))}
                        </ul>
                    </div>                    
                </div>
                <div className='2xl:flex mt-8'>
                    <div className='bg-gray-300 p-2 rounded-md shadow-lg border-solid border-4 border-gray-600 w-full mr-9 mb-6 2xl:mb-0'>
                        <p className='text-center mb-3'>
                            <span className="font-bold mr-2">Abilities:</span>
                        </p>
                        <ul className='divide-y-2 divide-gray-400 bg-gray-300'>
                            {pokeman.abilities.map((ability, index) => (
                                <li key={index} className='capitalize my-1 text-center'>
                                    {ability.ability.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='bg-gray-300 p-2 rounded-md shadow-lg border-solid border-4 border-gray-600 w-full'>
                        <p className='text-center mb-3'>
                            <span className="font-bold mr-2">Types:</span>
                        </p>
                        <ul className='divide-y-2 divide-gray-400 bg-gray-300'>
                            {pokeman.types.map((type, index) => (
                                <li key={index} className='capitalize my-1 text-center'>
                                    {type.type.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='mt-10 text-center md:flex justify-center'>
                    <Link href={`/pokemon?id=${pokeman.id - 1}`}>
                        <a className='bg-gray-200 p-2 rounded-md hover:bg-gray-300 xl:w-3/12'><span className='font-bold mr-2'>{pokeman.id - 1}.</span>PREVIOUS</a>
                    </Link>
                    <p className='mx-10 mb-5 lg:mb-0'></p>
                    <Link href={`/pokemon?id=${pokeman.id + 1}`}>
                    <a className='bg-gray-200 p-2 rounded-md hover:bg-gray-300 xl:w-3/12'><span className='font-bold mr-2'>{pokeman.id + 1}.</span>NEXT </a>
                    </Link>
                </div>
                <div className="mt-10 flex justify-center">
                    <Link href="/">
                        <a className="text-xl text-gray-100 m-1 underline hover:text-gray-300">Back to PokeNEXT!</a>
                    </Link>
                    <img 
                        src='/pokeball.svg' 
                        alt='pokeball'
                        className='h-10 w-10 ml-3'
                    />
                </div>
            </main>
        </div>
    )
}

export default Pokemon

export async function getServerSideProps({query}) {
    const id = query.id;
    try {
        const pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.data);
        const paddedIndex = ('00' + (id)).slice(-3);
        pokemon.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`

        return {
            props: {pokeman: pokemon}
        }
    } catch (error) {
        return {
            props: {pokeman: {message: 'Error'}}
        }
    }
}