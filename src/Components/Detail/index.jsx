import {useParams} from "react-router-dom";
import {getSingle} from "../../Services/fetchProducts.jsx";
import {useEffect, useState} from "react";
import styles from "./detail.module.css"
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

const CardDetails = () => {
    const {id} = useParams()
    const navigate = useNavigate();

    const [data, setData] = useState(null)

    const getSingleData = async () => {
        const response = await getSingle(id)
        setData(response)
    }

    useEffect(() => {
        getSingleData()
    }, [id])

    console.log(data)

    return (
        <>
            <Button variant={"contained"} color="secondary" sx={{margin: "10px"}}
                    onClick={() => navigate(-1)}>Back</Button>
            <div className={styles.detailContainer}>

                <img src={data?.images[0]} alt={data?.title}/>

                <div>
                    <h1>{data?.title}</h1>
                    <h2>{data?.category}</h2>
                    <p>{data?.description}</p>
                </div>


            </div>
        </>

    )
}

export default CardDetails