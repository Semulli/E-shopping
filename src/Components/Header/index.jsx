import React, {useState} from "react";
import {
    AppBar,
    Toolbar,
    Select,
    MenuItem,
    Button,
    InputBase,
    Box,
    Badge,
    IconButton
} from "@mui/material";
import {ShoppingBasket, FavoriteBorder, Search} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import {useNavigate, useLocation} from "react-router-dom";
import {Routers} from "../../Constants/Router.jsx";
import styles from "./header.module.css";
import {useData} from "../../GlobalProvider/GlobalProvider.jsx";

const SearchContainer = styled("div")(({theme, open}) => ({
    backgroundColor: "#f3f4f6",
    padding: open ? "8px 12px" : "0px",
    borderRadius: "8px",
    width: open ? "250px" : "0px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "width 0.3s ease-in-out, padding 0.3s ease-in-out, opacity 0.3s ease-in-out",
    overflow: "hidden",
    opacity: open ? 1 : 0,
}));

const ModernButton = styled(Button)({
    borderRadius: "8px",
    textTransform: "none",
});

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchOpen, setSearchOpen] = useState(false);
    const {favoriteData, basketData, searchQuery, setSearchQuery, sortValue, setSortValue, filteredProducts} = useData()
    return (
        <AppBar position="static" sx={{backgroundColor: "#6b4ea3", padding: "10px"}}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>

                <Box display="flex" alignItems="center" gap={2}>
                    <Select
                        value={sortValue}
                        onChange={(e) => setSortValue(e.target.value)}
                        displayEmpty
                        sx={{backgroundColor: "#a37eed", color: "white", borderRadius: "8px"}}
                    >
                        <MenuItem value="">Sort by</MenuItem>
                        <MenuItem value="A-z">A-z</MenuItem>
                        <MenuItem value="Z-a">Z-a</MenuItem>
                    </Select>
                    <ModernButton variant="outlined" color="warning"
                                  onClick={() => setSortValue("")}>Reset</ModernButton>
                    <span onClick={() => navigate(Routers.Home)}
                          className={location.pathname === Routers.Home ? styles.active : ""}>Home</span>
                    <span onClick={() => navigate(Routers.Products)}
                          className={location.pathname === Routers.Products ? styles.active : ""}>Products</span>
                </Box>


                <Box display="flex" gap={1}>
                    {!searchOpen && (
                        <IconButton onClick={() => setSearchOpen(true)} sx={{color: "white"}}>
                            <Search/>
                        </IconButton>
                    )}

                    <SearchContainer open={searchOpen}>
                        <InputBase
                            placeholder="Search products..."
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                        />

                        {searchQuery && filteredProducts?.length > 0 && (
                            <Paper
                                sx={{
                                    position: "absolute",
                                    top: "40px",
                                    left: 0,
                                    width: "100%",
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                    backgroundColor: "white",
                                    zIndex: 10,
                                    boxShadow: 3,
                                    borderRadius: "8px",
                                }}
                            >
                                <List>
                                    {filteredProducts().map((product) => (
                                        <ListItem
                                            key={product.id}
                                            button
                                            onClick={() => {
                                                navigate(`/product/${product.id}`);
                                                setSearchQuery(""); // 🔄 Seçildiğinde arama temizlensin
                                            }}
                                        >
                                            <ListItemText primary={product.name}/>
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        )}
                    </SearchContainer>
                    <IconButton sx={{color: "#a37eed"}} onClick={() => navigate(Routers.Basket)}>
                        <Badge badgeContent={basketData?.length || 0} color="error"
                               className={location.pathname === Routers.Basket ? styles.active : ""}>
                            <ShoppingBasket/>
                        </Badge>
                    </IconButton>
                    <IconButton sx={{color: "#a37eed"}} onClick={() => navigate(Routers.Favorites)}>
                        <Badge badgeContent={favoriteData?.length || 0} color="error"
                               className={location.pathname === Routers.Favorites ? styles.active : ""}>
                            <FavoriteBorder/>
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
