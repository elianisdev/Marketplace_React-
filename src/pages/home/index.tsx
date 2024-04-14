import React, {useEffect, useState} from "react";
import {Button, Container} from "@mui/material";
import {CardComponent, HeaderComponent} from "../../components";
import {characters} from "../../api/characters";

export const HomePage: React.FC <{}> = () => {

    const [, set] = useState()
    useEffect(()=> {
        characters.getAll({page: 1 }).then((r) => {
            console.log(r.data);
        }).catch((e) => {
            console.error(e);
        })
    },[]);

    return (
        <Container maxWidth="xl">
            <HeaderComponent
                title="Hola mundo"
                description="Hola mundo bienvenido"
                element={
                <Button fullWidth variant="contained">
                    Estamos en Home
                </Button>
            }
            />

        </Container>
    )
};
