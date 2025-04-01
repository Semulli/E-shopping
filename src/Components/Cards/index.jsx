import React, {useEffect, useState} from "react";
import {Card, CardContent, CardMedia, Typography, CardActions, IconButton, Box, Button} from "@mui/material";
import {Favorite, FavoriteBorder, ShoppingBasket, ShoppingBasketOutlined} from "@mui/icons-material";
import styles from "./card.module.css";
import {getProducts} from "../../Services/fetchProducts.jsx";
import {useNavigate} from "react-router-dom";
import {Routers} from "../../Constants/Router.jsx";
import {useData} from "../../GlobalProvider/GlobalProvider.jsx";

const Cards = () => {
    const navigate = useNavigate();
    const [datas, setDatas] = useState([])
    const {addFavorites, addBasket, favoriteData, basketData, searchQuery, sortValue} = useData()
    const getDatas = async () => {
        const response = await getProducts()
        // console.log(response.products)
        setDatas(response.products)
    }

    useEffect(() => {
        getDatas()
    }, [])

    console.log(datas)

    const filteredDatas = searchQuery
        ? datas.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : datas;

    const sortedDatas = [...filteredDatas].sort((a, b) => {
        if (sortValue === "A-z") return a.title.localeCompare(b.title);
        if (sortValue === "Z-a") return b.title.localeCompare(a.title);
        return 0;
    })
    return (
        <div className={styles.cards}>
            {sortedDatas.map((item) => {
                const isFavorite = favoriteData?.some((fav) => fav.id === item.id);
                const isInBasket = basketData?.some((basket) => basket.id === item.id);

                return (
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
                                {item.description.slice(0, 51)}...
                            </Typography>
                            <Typography variant="h6" component="div" sx={{color: "purple"}}>
                                Category: {item.category}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Box>
                                <Typography variant="body1" component="span" sx={{marginRight: 2, color: "red"}}>
                                    {item.price}$
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{color: "purple"}}>
                                    Rating: {item.rating}
                                </Typography>
                            </Box>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <IconButton onClick={() => addBasket(item)}>
                                    {isInBasket ? <ShoppingBasket sx={{color: "green"}}/> : <ShoppingBasketOutlined/>}
                                </IconButton>
                                <IconButton onClick={() => addFavorites(item)}>
                                    {isFavorite ? <Favorite sx={{color: "red"}}/> : <FavoriteBorder/>}
                                </IconButton>
                                <Button variant="outlined" color="secondary" sx={{marginLeft: 2}}
                                        onClick={() => navigate(`${Routers.ProductDetails}/${item.id}`)}>
                                    Learn More
                                </Button>
                            </div>
                        </CardActions>
                    </Card>
                )
            })}

        </div>
    );
};

export default Cards;
