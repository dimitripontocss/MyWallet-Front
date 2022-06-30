import { useContext,useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../Context/UserContext";

export default function Login(){

    const navigate = useNavigate();

    const{ setToken,setUsername } = useContext(UserContext);
    const user = JSON.parse(localStorage.getItem("user"));
    if(user !== null){
        setToken(user.token)
        setUsername(user.name)
        navigate("/home")
    }

    const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");

    function login(event){
        event.preventDefault();
        const body = {
            email: email,
            password: senha
        }
        const promise = axios.post(
            "http://localhost:5001/login",
            body
          );
          promise.then((response)=> 
          {
            setToken(response.data.token);
            setUsername(response.data.name);
            const user = JSON.stringify(response.data);
            localStorage.setItem("user", user);
            navigate("/home");
          })
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
            <form onSubmit={login}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)}/>
                <button type="submit">Entrar</button>
            </form>
            <Link to="/cadastro"><p>Ainda não tem uma conta? Cadastre-se!</p></Link>
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
margin-top: 175px;
margin-bottom: 10px;

font-family: 'Saira Stencil One', sans-serif;
font-size: 32px;
font-weight: 400;
color: #ffffff;
`