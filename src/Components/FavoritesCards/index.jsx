import {Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import {FavoriteBorder, ShoppingBasket, ShoppingBasketOutlined} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Routers} from "../../Constants/Router.jsx";
import React from "react";
import styles from "./favCards.module.css"
import {useData} from "../../GlobalProvider/GlobalProvider.jsx";

const FavoritesCards = () => {

    const {favoriteData, deleteFav, addBasket, basketData} = useData()
    console.log(favoriteData)
    return (

        <div className={styles.cards}>
            {favoriteData.length === 0 && <div style={{fontSize:"40px", color:"purple",margin:"40px"}}> Doesn't have any fav go add!!!</div>}
            {favoriteData?.map((item) => {
                const isInBasket = basketData?.some((basket) => basket.id === item.id);

                return (<Card className={styles.card} key={item?.id}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={item?.images[0]}
                        alt={item?.title}
                    />
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {item?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{color: "#a37eed"}}>
                            {item?.description.slice(0, 100)}....
                        </Typography>
                        <Typography variant="h6" component="div" sx={{color: "purple"}}>
                            {item?.category}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Box>
                            <Typography variant="body1" component="span" sx={{marginRight: 2, color: "red"}}>
                                {item.price}$
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{color: "purple"}}>
                                Rating:{item.rating}
                            </Typography>
                        </Box>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <IconButton onClick={() => addBasket(item)}>
                                {isInBasket ? <ShoppingBasket sx={{ color: "green" }} /> : <ShoppingBasketOutlined/>}
                            </IconButton>
                            <IconButton onClick={() => deleteFav(item.id)}>
                                <DeleteIcon/>
                            </IconButton>

                        </div>
                    </CardActions>
                </Card>)
            })}

        </div>

    )
}


export default FavoritesCards