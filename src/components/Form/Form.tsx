import { ChangeEvent, useState } from 'react';
import './Form.css';

const API_URL = "http://localhost:3010/";

const loginData = {
    email: 'jmanuelc369@gmail.com',
    password: '12345'
}



function Form(){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showData, setShowData] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);

    // const handleInputChange = (stateUpdate) => {
    //     return (event) => {
    //         stateUpdate(event.target.value);
    //     }
    // }

    const handleOnEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    
    const handleOnPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);

    }

    const handleOnClick = () =>{
        logIn({email, password});

        // if(!showData){
        //     if(email === loginData.email && password === loginData.password){
        //         setShowData(true);
        //     }
        //     else{
        //         alert("Credenciales incorrectas.");
        //     }

        // }
        // else{
        //     setShowData(!showData)
            
        // }
        
    }

    const logIn = async ({email, password}: {email: string, password: string}) => {
        try{
            const response = await fetch(`${API_URL}api/v1/auth/login`, {
                method : 'POST',
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({email, password}),
            });

            if(response.status === 200){
                const data = await response.json();
                console.log(data);
                setUser(data);
            }else{
                alert("Usuario o contraseña incorrectos");

            }

    
    
        } catch(error){
            console.log(error);
        }
    
    }

    return (
        <>
            <section className='dataContainer'>
                {showData && (
                        <p>Bienvenido: {email}</p>   
                )}
            </section>
            <section>
                <div className="inputDiv">
                    <input type="email" id="email" name="email" value={email} placeholder="Correo" className="loginInput" onChange={handleOnEmailChange}/>
                    <input type="password" id="password" name="password"  value={password} placeholder="Contraseña" className="loginInput" onChange={handleOnPasswordChange}/>
                </div>
                <button onClick={handleOnClick}>
                    {
                        showData ? "Salir" : "Enviar"
                    }
                </button>
            </section>
        </>
    );
}


export default Form;