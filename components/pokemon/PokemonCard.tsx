import { FC } from 'react'
import { useRouter } from 'next/router';
import { Card, Grid, Row, Text } from '@nextui-org/react'

import { SmallPokemon } from '../../interfaces';

interface Props {
    pokemon: SmallPokemon;
};

export const PokemonCard: FC<Props> = ({ pokemon }) => {

    const { push } = useRouter();

    const handleClick =() => {
        push(`/name/${ pokemon.name }`);
    };

    const { id, name, img, url } = pokemon;

    return (
        <Grid xs={6} sm={3} md={2} xl={1} onClick={ handleClick }>
            <Card hoverable clickable>
                <Card.Body css={{ p: 1 }}>
                    <Card.Image src={img} width='100%' height={140} />
                        </Card.Body>
                    <Card.Footer>
                    <Row justify='space-between'>
                        <Text transform='capitalize' >{name}</Text>
                        <Text>#{id}</Text>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    )
}
