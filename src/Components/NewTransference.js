import { useContext,useState } from "react";
import { useNavigate,Link,useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../Context/UserContext";

function translate(tipo){
    if(tipo === "entrada"){
        return "income";
    }else{
        return "outcome"
    }
}

export default function NewTransference(){
    const { tipo } = useParams();
    const type = translate(tipo);
    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    const [valor,setValor]= useState("");
    const [descricao,setDescricao]= useState("");

    function save(event){
        event.preventDefault();
        console.log(valor,descricao,type,token)
        const body = {
            amount: valor,
            description: descricao,
            type: type
        }
        axios.post("http://localhost:5001/register",body, {
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          })
          .then((e)=>{alert(e.data); navigate("/home")})
          .catch((e)=>{alert(e.response.data)});
    }

    return(
        <>
        {
            type === "income" ?
            <Container>
                <div onClick={()=>{navigate(-1)}}><ion-icon name="arrow-back-outline"></ion-icon></div>
                <Title>
                    Nova entrada
                </Title>
                <form onSubmit={save}>
                    <input type="text" placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)}/>
                    <input type="text" placeholder="Descriçao" value={descricao} onChange={e => setDescricao(e.target.value)}/>
                    <button type="submit">Salvar entrada</button>
                </form>
            </Container> 
            : 
            <Container>
                <div onClick={()=>{navigate(-1)}}><ion-icon name="arrow-back-outline"></ion-icon></div>
                <Title>
                    Nova saída
                </Title>
                <form onSubmit={save}>
                    <input type="text" placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)}/>
                    <input type="text" placeholder="Descriçao" value={descricao} onChange={e => setDescricao(e.target.value)}/>
                    <button type="submit">Salvar saída</button>
                </form>
            </Container>
        }
        </>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;

position: relative;
    ion-icon{
        position: absolute;
        top: 25px;
        left: 20px;

        font-size: 26px;
        color: #FFFFFF;
    }
    form{
        display: flex;
        flex-direction: column;

        margin-top: 25px;

        width: 80%;
    }
    input{
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;

        margin-bottom: 8px;
        padding: 10px;

        font-family: 'Raleway',sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: black;
    }
    input::placeholder{
        font-family: 'Raleway',sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: #000000;
    }
    button{
        height: 45px;
        background: #A328D6;
        border: 0;
        border-radius: 5px;
        margin-bottom: 50px;

        font-family: 'Raleway',sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        color: #FFFFFF;
    }
`

const Title = styled.div`
margin-top: 25px;
margin-bottom: 10px;

font-family: 'Raleway', sans-serif;
font-size: 26px;
font-weight: 400;
color: #ffffff;
`