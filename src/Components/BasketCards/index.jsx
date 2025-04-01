import {Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import {ShoppingBasket, Delete} from "@mui/icons-material";
import React, {useState} from "react";
import styles from "./basket.module.css"
import {useData} from "../../GlobalProvider/GlobalProvider.jsx";

const BasketCards = () => {
    const {basketData, deleteBasket} = useData();
    const [quantities, setQuantities] = useState(
        basketData?.reduce((acc, item) => ({...acc, [item.id]: 1}), {})
    );

    const increaseQuantity = (id) => {
        setQuantities((prev) => ({...prev, [id]: prev[id] + 1}));
    };


    const decreaseQuantity = (id) => {
        setQuantities((prev) => {
            if (prev[id] > 1) {
                return {...prev, [id]: prev[id] - 1};
            }
            return prev;
        });
    };

    const totalSum = basketData?.reduce(
        (sum, item) => sum + item.price * (quantities[item.id] || 1),
        0
    );

    return (
        <div>
            <div className={styles.cards}>
                {basketData?.map((item) => (
                    <Card className={styles.card} key={item.id}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={item.images[0]}
                            alt={item.title}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{color: "#a37eed"}}>
                                {item.description.slice(0, 100)}....
                            </Typography>
                            <Typography variant="h6" component="div" sx={{color: "purple"}}>
                                {item.category}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <Button variant="outlined" size="small" onClick={() => decreaseQuantity(item.id)}>
                                    -
                                </Button>
                                <Typography variant="body1" sx={{margin: "0 10px"}}>
                                    {quantities[item.id] || 1}
                                </Typography>
                                <Button variant="outlined" size="small" onClick={() => increaseQuantity(item.id)}>
                                    +
                                </Button>
                            </Box>
                            <Typography variant="body1" sx={{color: "red"}}>
                                {item.price * (quantities[item.id] || 1)}$
                            </Typography>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <IconButton onClick={() => deleteBasket(item.id)}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        </CardActions>
                    </Card>
                ))}
            </div>


            <Box sx={{textAlign: "right", marginTop: 3}}>
                <Typography variant="h6">Toplam: {totalSum}$</Typography>
            </Box>
        </div>
    );
};

export default BasketCards;
