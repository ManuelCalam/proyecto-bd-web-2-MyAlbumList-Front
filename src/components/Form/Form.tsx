import { ChangeEvent, useEffect, useState } from 'react';
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
    const [album, setAlbum] = useState<any>(null);

    useEffect(() => {
        const userInStorageString = window.localStorage.getItem("user");
        if(userInStorageString){
            const userInStorage = JSON.parse(userInStorageString);
            setUser(userInStorage);
            console.log(userInStorage);
        }

       
    }, [])

    
    

  

    const handleOnEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    
    const handleOnPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);

    }

    const handleOnClick = () =>{
        // logIn({email, password});

        fetchCategory();

        
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

                window.localStorage.setItem("user", JSON.stringify(data));
            }else{
                alert("Usuario o contraseña incorrectos");

            }
            
            
            
        } catch(error){
            console.log(error);
        }
        
    }

    const fetchCategory = async () => {
        try {
            const response = await fetch(`${API_URL}api/v1/albums`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }            
            });
            const data = await response.json();

            console.log(data);
            setAlbum(data);

        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            {
                user && (
                    <section className='dataContainer'>
                        {
                            
                                <>
                                    <p>Email: {user.user.email}</p>
                                    <p>Nombre: {user.user.name}</p>
                                    <p>Id: {user.user.id}</p>
                                </>
                            
                        }
                    </section>
                )
            }

            {
                album && (
                        <section className="movieContainer">
                        <h2>Albums</h2>
                        <table>
                            <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Artista</th>
                                <th>Año de lanzamiento</th>
                            </tr>
                            </thead>
                            <tbody>
                            {album.map((album: any) => (
                                <tr key={album.name}>
                                <td>{album.name}</td>
                                <td>{album.artist}</td>
                                <td>{album.release_year}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </section>
            
            )}

            
            
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