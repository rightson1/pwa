import Head from 'next/head'

function Header({ title, desc }) {
    const title2 = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
    return (
        <Head>
            <title>{title2}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name='description' content={desc} />
        </Head>


    )
}

export default Header