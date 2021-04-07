import React from 'react'
import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({title, children}) => {
    return (
        <div className='bg-red-300'>
            <Head>
                <title>{title}</title>
                <link rel='icon' href='/favicon.ico'/>
            </Head>
            <Navbar />
            <main className='container mx-auto min-h-screen py-10'>
                {children}
            </main>
        </div>
    )
}

export default Layout
