import { getSession } from 'next-auth/client'
import React from 'react'
import {PrismaClient} from '@prisma/client';
import PokemonsGrid from '../components/PokemonsGrid';
import Layout from '../components/Layout';

const profile = ({user}) => {
    if(user) user = JSON.parse(user);

    return (
        <Layout>
            {user ? <PokemonsGrid pokemons={user.pokemons}/> : null}            
        </Layout>
    )
}

export default profile

export async function getServerSideProps(context) {
    try {
        const prisma = new PrismaClient();
        const session = await getSession(context);
        console.log(session);
        
        if(session) {
            const user = await prisma.user.findUnique({
                where: {
                    id: +session.user.id
                },
                include: {
                    pokemons: true
                }
            })

            return {
                props: {
                    user: JSON.stringify(user)
                }
            }
        } else {
            return {
                props: {
                   
                }
            }
        }
        
    } catch (e) {
        console.log(e)
    }
}