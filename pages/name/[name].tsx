import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti';

import { Pokemon, PokemonListResponse } from '../../interfaces';
import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { getPokemonInfo, localFavorites } from '../../utils';

interface Props {
    pokemon: Pokemon
}

export default function PokemonByNamePage ({ pokemon }: Props) {
    const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites(pokemon.id) );
    
    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites( !isInFavorites );

        if( !isInFavorites ) {
            confetti({
                zIndex: 999,
                particleCount: 100,
                spread: 160,
                angle: -100,
                origin: {
                    x: 1,
                    y: 0
                }
            });
        }
    };

    return (
        <Grid.Container css={{ mt:5 }} gap={2}>
            <Grid xs={12} sm={4}>
                <Card hoverable css={{ p: 30 }}>
                    <Card.Body>
                        <Card.Image src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' } 
                        alt={ pokemon.name }
                        width='100%' height={ 200 } 
                    />
                    </Card.Body>
                </Card>
            </Grid>

            <Grid xs={12} sm={8}>
                <Card>
                    <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text h1 transform='capitalize'> { pokemon.name } </Text>

                        <Button
                            color='gradient'
                            ghost={ !isInFavorites }
                            onClick={ onToggleFavorite }
                        >
                            { isInFavorites ? 'Eliminar de Favoritos' : 'Guardar en Favoritos' }
                        </Button>
                    </Card.Header>

                    <Card.Body>
                        <Text size={30}> Sprites: </Text>

                        <Container direction='row' display='flex' gap={0}>
                            <Image 
                                src={ pokemon.sprites.front_default }
                                alt={ pokemon.name }
                                width={ 100 }
                                height={ 100 }
                            />
                            <Image 
                                src={ pokemon.sprites.back_default }
                                alt={ pokemon.name }
                                width={ 100 }
                                height={ 100 }
                            />
                            <Image 
                                src={ pokemon.sprites.front_shiny }
                                alt={ pokemon.name }
                                width={ 100 }
                                height={ 100 }
                            />
                            <Image 
                                src={ pokemon.sprites.back_shiny }
                                alt={ pokemon.name }
                                width={ 100 }
                                height={ 100 }
                            />
                        </Container>
                    </Card.Body>
                </Card>
            </Grid>
        </Grid.Container>
    );
};

PokemonByNamePage.getLayout = (page: JSX.Element) => {
    
    const { name } = page.props.pokemon;

    return (
        <Layout title={ name.toUpperCase() }>
            { page }
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    
    const limit = 151;
    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=${limit}`);
    const Pokemons151 = data.results;

    return {
        paths: Pokemons151.map( ({ name }) => ({ params: { name } }) ),
        fallback: 'blocking'
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string };
    const pokemon = await getPokemonInfo( name );

    if( !pokemon ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            pokemon
        },
        revalidate: 86400
    };
}