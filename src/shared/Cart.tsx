import React from 'react';
import {
    Box, CardProps,
    Divider,
    Drawer,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { HorizontalCardComponent } from '../components/HorizontalCard';
import {useAppSelector} from "../redux/hooks";

interface CartComponentProps {
    open: boolean;
    handleStateViewDrawer: (state: string) => void;
}

export const CartComponent: React.FC<CartComponentProps> = ({
        open,
        handleStateViewDrawer,
         }) => {
    const items = useAppSelector((state) => state.cartReducer);

    return (
        <Drawer anchor={'right'} open={open}>
            <Box sx={{ width: '25em', p: 2 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h5">Cart</Typography>
                    <IconButton color="primary" onClick={() => handleStateViewDrawer("cart")}>
                        <CloseRoundedIcon />
                    </IconButton>
                </Stack>
                <Divider sx={{ my: 1.5 }} />
                {items.length > 0 ?
                    items.map(({id, image, name, info}: CardProps) => (
                        <HorizontalCardComponent
                            id={id}
                            image={image}
                            name={name}
                            info={info}
                         />
                    ))
                    : 'No items in the cart'
                }
            </Box>
        </Drawer>
    );
};