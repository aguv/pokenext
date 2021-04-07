import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

export default async function handler(req, res) {
    const {name, image, index} = req.body

    if(req.method === 'PUT') {

        const user = await prisma.user.update({
            where: {
                id: +req.query.userId
            },
            data: {
                pokemons: {
                    connectOrCreate: {
                        where: {
                            index
                        },
                        create: {
                            name,
                            image,
                            index
                        }
                    }
                }
            },
            include: {
                pokemons: true
            }
        })

        res.send(user);   
        
    } else if (req.method === 'POST') {
        
        const user = await prisma.user.update({
            where: {
                id: +req.query.userId
            },
            data: {
                pokemons: {
                    disconnect: {
                        index
                    }
                }
            },
            include: {
                pokemons: true
            }
        })

        res.json(user);
    } 
    else {
        res.send('Wrong rute m8!')
    }

}