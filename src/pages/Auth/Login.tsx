import React, { useState } from 'react';
import "./Login.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../apis/authApi';
import jwt_decode from 'jsonwebtoken';
import { setUserCredentials } from '../../store/redux/Auth/actions';
import { IUserAuth } from '../../interfaces';
const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loginUser] = useLoginUserMutation();
    const [userInput, setUserInput] = useState({
        username: "",
        password: ""
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData: any = { ...userInput };
        tempData[e.target.name] = e.target.value;
        setUserInput(tempData);
    };

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response: any = await loginUser({
            username: userInput.username,
            password: userInput.password,
        });

        console.log(response);
        if (response.token) {
            const token = response.token;
            localStorage.setItem("token", token as string);
            // dispatch(setUserCredentials({
            //     userId: "20ed784c-eba5-44e5-8ff9-a94fd0ef823e",
            //     userName: "Name Vu",
            //     userRoles: "dev",
            //     token: token
            // }));
            // const decoded = jwt_decode.decode(token);
            // // dispatch(
            // //     setUserCredentials({
            // //         userId: decoded?.sub?.toString(),
            // //         userName: decoded?.name,
            // //         userRoles: decoded?.roles,
            // //         token: token,
            // //     })
            // // );
            navigate('/');
        } else if (response.error) {
            setError(response.error.data.errorMessages[0]);
        }
    };

    return (
        <div className="container text-center">
            <form method="post" onSubmit={login}>
                <h1 className="mt-5">Login</h1>
                <div className="mt-5">
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Username"
                            required
                            name="username"
                            value={userInput.username}
                            onChange={handleUserInput}
                        />
                    </div>

                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            required
                            name="password"
                            value={userInput.password}
                            onChange={handleUserInput}
                        />
                    </div>
                </div>

                <div className="mt-2">
                    {error && <p className="text-danger">{error}</p>}
                    <button
                        type="submit"
                        className="btn btn-success"
                        style={{ width: "200px" }}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;