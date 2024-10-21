// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../apis/authApi';
import IApiResponse from '../../interfaces/apiResponse';
import { setUserCredentials } from '../../store/redux/Auth/actions';
const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
    const [loginUser] = useLoginUserMutation();

    const [userInput, setUserInput] = useState({
        username: "",
        password: ""
    });

    // Handle user input for form fields
    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInput((prevState) => ({ ...prevState, [name]: value }));
    };

    // Handle the form submission
    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response: IApiResponse = await loginUser({
                email: userInput.username,
                password: userInput.password,
            });

            // If login is successful and the token is returned
            if (response?.data?.result?.token) {
                const token = response.data.result.token;
                sessionStorage.setItem('token', token);

                dispatch(setUserCredentials(token));
                console.log(token);

                // Navigate to the dashboard/home page
                navigate('/');
            } else if (response?.error) {
                // Handle login error
                setError(response.error.data.errorMessages[0]);
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Officer Login</h2>
                <form onSubmit={login} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={userInput.username}
                            onChange={handleUserInput}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={userInput.password}
                            onChange={handleUserInput}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Login
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-500">or</div>

                    <div>
                        <button
                            type="button"
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                            onClick={() => window.location.href = 'https://accounts.google.com/o/oauth2/auth'}
                        >
                            Login with Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
