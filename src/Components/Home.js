import { useContext,useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../Context/UserContext";

export default function Home(){
    const navigate = useNavigate();

    const {username,token} = useContext(UserContext)
    const [register,setRegister] = useState([])
    console.log(username,token)

    if(username === null || token === null){
        console.log(username,token)
        navigate("/");
    }
    useEffect(() => {
        const promise = axios.get("http://localhost:5001/register", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        promise.then((response) => setRegister(response.data) );
    }, [])

    


    return(
        <Container>
            <Header>
                <p>Olá, {username}</p>
                <ion-icon name="exit-outline"></ion-icon>
            </Header>
            <Register>
                {
                    register.length === 0 ? 
                        <p>Não há registros de<br/>
                        entrada ou saída</p> 
                        :
                        <p>Há registros de
                        entrada ou saída</p>
                }
            </Register>
            <Buttons>
                <div onClick={()=>{navigate("/adicionar/entrada")}}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova entrada</p>
                </div>
                <div onClick={()=>{navigate("/adicionar/saida")}}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova saída</p>
                </div>
            </Buttons>
        </Container>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

padding: 20px;

`
const Header = styled.div`
width: 95%;
display: flex;
justify-content: space-between;

font-family: 'Raleway',sans-serif;
font-style: normal;
font-weight: 700;
font-size: 26px;
color: #FFFFFF;

`
const Register = styled.div`
margin-top: 25px;
background-color: #ffffff;
width: 95%;
height: 400px;
border-radius: 5px;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
    p{
        font-family: 'Raleway',sans-serif;
        font-weight: 400;
        font-size: 20px;
        text-align: center;
        color: #868686;
    }
`
const Buttons = styled.div`
margin-top: 10px;
width: 95%;
display: flex;
justify-content: space-between;
    div{
        height: 100px;
        width: 46%;

        background-color: #A328D6;

        border-radius: 5px;
        padding: 7px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        p{
            font-family: 'Raleway',sans-serif;
            font-weight: 700;
            font-size: 17px;
            color: #ffffff;
        }
        ion-icon{
            font-size: 30px;
            color: #ffffff;
        }
    }
`