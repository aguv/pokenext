import Link from 'next/link'
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/client";


const Navbar = () => {
    const [session, loading] = useSession();

    return (
        <div className='w-full flex h-20 bg-red-400 shadow-md'>
            <div className='flex flex-1 h-20 p-5'>
                <Link href='/'>
                    <a className=' bg-gray-200 rounded-md border-2 border-solid border-gray-600 mr-2 w-24 text-center hover:bg-gray-500 text-red-600 hover:text-gray-50'>
                        <span className='inline-block mt-1.5'>
                                KANTO
                        </span>
                    </a>
                </Link>
                <Link href='/johto'>
                    <a className='bg-gray-200 rounded-md border-2 border-solid border-gray-600 mr-2 w-24 text-center hover:bg-gray-500 text-red-600 hover:text-gray-50'>
                        <span className='inline-block mt-1.5'>
                                JOHTO
                        </span>
                    </a>
                </Link>
                <Link href='/hoenn'>
                    <a className='bg-gray-200 rounded-md border-2 border-solid border-gray-600 mr-2 w-24 text-center hover:bg-gray-500 text-red-600 hover:text-gray-50'>
                        <span className='inline-block mt-1.5'>
                                HOENN
                        </span>
                    </a>
                </Link>
            </div>
            <div className='p-5 flex'>
                
                {session ?
                    (  
                        <div className='flex'>
                            <button className='bg-gray-500 hover:bg-gray-300 hover:text-red-400 rounded-sm mr-2 w-24 shadow-md text-gray-50 rounded-md border-solid border-gray-600 border-2' onClick={() => signOut()}>
                                LOG OUT
                            </button>
                            <Link href='/profile'>
                                <a className='bg-gray-500 hover:bg-gray-300 hover:text-red-400 text-center flex items-center justify-center rounded-sm mr-2 w-24 shadow-md text-gray-50 rounded-md border-solid border-gray-600 border-2'>
                                    PROFILE
                                </a>
                            </Link>
                        </div>                        
                    )
                    :
                    <button className='bg-gray-500 hover:bg-gray-300 hover:text-red-400 rounded-sm mr-2 w-24 shadow-md text-gray-50 rounded-md border-solid border-gray-600 border-2' onClick={() => signIn()}>
                        SIGN IN
                    </button>
                }
            </div>
        </div>
    )
}

export default Navbar
