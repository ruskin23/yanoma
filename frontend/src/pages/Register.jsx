import { useState } from 'react'
import { registerUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        })) ;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Form Submitted", formData)
        
        try {
            const data = await registerUser(formData);
            setMessage(data.message);
            setFormData({
                username: "",
                email: "",
                password: ""        
            });
            navigate('/login')
        } catch (error) {
            setMessage(error.message)
        }
    }
    return (
        <div className="min-h-screen bg-stone-800 flex items-center justify-center">
            <div className="bg-stone-700 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-stone-200 mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label 
                            htmlFor="username" 
                            className="block text-stone-300 text-sm"
                        >
                            Username
                        </label>
                        <input 
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-stone-600 text-stone-200 rounded focus:outline-none focus:ring-2 focus:ring-stone-400"
                        />
                    </div>
                    <div className="space-y-2">
                        <label 
                            htmlFor="email" 
                            className="block text-stone-300 text-sm"
                        >
                            Email
                        </label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-stone-600 text-stone-200 rounded focus:outline-none focus:ring-2 focus:ring-stone-400"
                        />
                    </div>
                    <div className="space-y-2">
                        <label 
                            htmlFor="password" 
                            className="block text-stone-300 text-sm"
                        >
                            Password
                        </label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-stone-600 text-stone-200 rounded focus:outline-none focus:ring-2 focus:ring-stone-400"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-stone-500 text-stone-200 py-2 rounded hover:bg-stone-400 transition-colors mt-6"
                    >
                        Register
                    </button>
                </form>
                {message && (
                    <p className="mt-4 text-center text-red-400">{message}</p>
                )}
            </div>
        </div>
    )
}

export default Register