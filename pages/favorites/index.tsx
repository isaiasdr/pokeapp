import { useEffect, useState } from 'react';

import { Layout } from '../../components/layouts';
import { FavoritePokemons, NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';


export default function FavoritesPage () {

    const [ favoritePokemons, setFavoritePokemons ] = useState<number[]>([]);

    useEffect( () => {
        setFavoritePokemons(localFavorites.pokemons);
    }, [] );

    return (
        <>
            { 
                favoritePokemons.length === 0 
                ? <NoFavorites /> 
                : <FavoritePokemons pokemons={ favoritePokemons } />
            }
        </>
    );
};

FavoritesPage.getLayout = (page: JSX.Element) => {
    return (
        <Layout title='Pokemons Favoritos'>
            { page }
        </Layout>
    );
};