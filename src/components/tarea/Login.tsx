import React, { FormEvent, useState, useReducer, useEffect, } from 'react';
import { User } from '../Interfaces/User.ts';
import { AuthAction } from '../Interfaces/AuthAction.ts';
import { LoginPayLoad } from '../Interfaces/LoginPayLoad';
import './style.css';

const initialState:User = {
    validating:false,
    token:null,
    username:"Alex",
    password:"loquesea",
    logged:false
}

const authReducer = (state : User, action:AuthAction) : User => {
    switch(action.type) {

        case 'logout':
            return {
                ...initialState,
                validating:false,
                logged:false
            };

        case 'login':
            const {password,username} = action.payload
            return {
                password,
                username,
                validating:true,
                token:'ABC123',
                logged:true
            }

        default: 
            return state;
    }
}
//Declarar la funcion login en donde vamos a declaras las variables
function Login(){
    
    const[state,dispatch] = useReducer(authReducer,initialState);

    const[username,setUsername] = useState('');

    const[password,setPassword] = useState('');

    const[submited,setSubmited] = useState(false);

     const login = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload : LoginPayLoad = {
            username:'Alex',
            password: 'jiji12',
        };
        setSubmited(true);
        dispatch({type: 'login',payload});
    }
    
    const logout = () => dispatch({type:'logout'});

    useEffect(()=> {
        setTimeout(login,3000);
    },[]);
//*************************************************************************************************************************** */
//Apartado donde me muestra lo que se va a imprimir en la pantalla principal
    return(
        <div className='login'>

            <form onSubmit={login}>
                <div className='usuario'>
                    <label className='titulo'>Ingresa tus credenciales:</label>
                    <label className='titulos1'>Usuario</label>
                    <input 
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    />
                </div>

                <div className='contraseña'>
                    <label className='titulos1'>Contraseña</label>
                    <input 
                    type="text"
                    name="password"
                    value={password}
                    onChange = {(e)=>setPassword(e.target.value)}
                    />
                </div>

                <input className='btnlogin' type="submit" value="Login"/>
                <br/>

                
                {submited && state.validating && state.username==username && state.password == password &&
                <h4 className='bienvenido'>Welcome: {username}</h4>  }
                {submited && state.validating && state.username!=username && state.password != password &&
                <h4>Mala contraseña o usuario compa</h4>  }
                
               { state.logged && <button className='adios' onClick={logout}>Cerrar Sesión</button> }
            </form>
        </div>
    );
}

export default Login;