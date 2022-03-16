import { GetStaticProps } from 'next'
import { Grid } from '@nextui-org/react';

import { Layout } from '../components/layouts';
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';

interface Props {
    pokemons: SmallPokemon[];
};

export default function HomePage(props: Props) {
    
    const { pokemons } = props;

    return (
        <>
            <Grid.Container gap={2} justify='flex-start'>
                {
                    pokemons.map((pokemon) => ( 
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))
                }
            </Grid.Container>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    const { results } = data;

    const pokemons: SmallPokemon[] = results.map((pokemon, index) => ({
        ...pokemon,
        id: index + 1,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`
    }));
    
    return {
        props: {
            pokemons
        }
    };
}  

HomePage.getLayout = (page: JSX.Element) => {
    return (
        <Layout title='Listado de pokemons'>
            { page }
        </Layout>
    );
};
