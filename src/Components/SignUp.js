import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";


export default function SignUp(){

    const navigate = useNavigate()

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [senha2, setSenha2] = useState("");

    function signUp(event){
        event.preventDefault();
        const body = {
            email: email,
            name: nome,
            password: senha,
            passwordConfirmation: senha2
        }
        const promise = axios.post(
            "http://localhost:5001/signup",
            body
          );
          promise.then((a)=> {alert(a.data);navigate("/")})
          .catch((e)=>
            {
                alert(e.response.data);  
            })
    }

    return(
        <Container>
            <Title>
                MyWallet
            </Title>
            <form onSubmit={signUp}>
                <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)}/>
                <input type="password" placeholder="Confirme a senha" value={senha2} onChange={e => setSenha2(e.target.value)}/>
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/"><p>Já tem uma conta? Faça login!</p></Link>
        </Container>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
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
    p{
        font-family: 'Raleway',sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        color: #FFFFFF;
    }

`
const Title = styled.div`
margin-top: 150px;
margin-bottom: 10px;

font-family: 'Saira Stencil One', sans-serif;
font-size: 32px;
font-weight: 400;
color: #ffffff;
`