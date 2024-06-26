import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {characters} from "../../api/characters";
import {ICharacter} from "./interface/character.interface";
import {Box, CircularProgress, Container, Divider, Grid, Typography, Chip} from "@mui/material";

const CharacterPage : React.FC  = () => {
    const {id} = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [character , setCharacter] = useState< ICharacter | null >(null);

    const ParamsCharacter = async () => {
        try {
            setLoading(true);
            const response = await characters.getById({id});
            if (!response.data) {
                throw new Error("No se recibió ningún parameter de la ruta");
            }
            setCharacter(response.data);
            setLoading(false);
        } catch (e) {
            console.error(e);
        }

    }
    useEffect(() => {
        ParamsCharacter();
    }, [id]);

    //React.useEffect(() => {
       // characters
           // .getById({id})
            //. then((r)=> {
              //  setCharacter(r.data)
           // setLoading(false)
           // })
            //.catch((e)=> console.error(e))
   // }, []);
    return (
        <Box sx={{width: "100"}}>
        <Container maxWidth="xl">
            {
                loading ?
                    <Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
                    <CircularProgress />
                </Box> : (
                    <Grid sx={{mt:2}} container columnSpacing={2}>
                        <Grid item xs={6}>
                           <Typography variant= "h3">
                                 Nombre: {character!.name}
                           </Typography>
                            <Divider sx={{mb:2}}/>
                            <Typography variant= "h4">
                                Status: {character!.status}
                            </Typography>
                            <Typography variant= "h4">
                                Species: {character!.species}
                            </Typography>
                            <Typography variant= "h4">
                                Species: {character!.origin.name}
                            </Typography>
                            <Box sx={{mt: 2}}>
                                <Chip
                                    label={character!.status === "Alive" ? "Alive" : "Dead"}
                                    clickable
                                    color={character!.status === "Alive" ? "primary" : "secondary"}
                                    variant="outlined"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <img src={character!.image} style={{width:"75%", borderRadius:"0.5em"}} alt={character?.name} />
                        </Grid>
                    </Grid>
                )}
        </Container>
        </Box>
    )
}

export default CharacterPage;
