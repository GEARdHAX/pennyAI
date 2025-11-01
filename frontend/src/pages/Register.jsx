import React , {useState,useContext,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
const STATUS_CHECK_URL = 'http://localhost:5000/api/users/login';
const LOGIN_POST_URL = 'http://localhost:5000/api/users/login';
function Register(){
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [ConfirmPassword,setConfirmPassword] = useState("")
    const [message,setMessage] = useState("")
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const { login } = useContext(AuthContext);
  axios.defaults.withCredentials = true;
  useEffect(() => {
          const checkLoginStatus = async () => {
              try {
                  const response = await fetch(STATUS_CHECK_URL, {
                      method: 'GET',
                      credentials: 'include',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                  });
                  
                  const data = await response.json(); 
                  
                  if (data.redirect) {
                      console.log(data.message);
                      setMessage(data.message);
                      navigate(data.redirect); 
                  }
                  
              } catch (error) {
                  console.error("Status check failed or returned HTML.", error); 
              } finally {
                  setIsLoading(false);
              }
          };
          
          checkLoginStatus();
          
      }, [navigate]);
const handleSubmit =(e)=>{
   e.preventDefault();
   if(name === "" || email === "" || password === "" || ConfirmPassword === ""){
    setMessage("Please fill in all fields");
    return;
   }
   if(password !== ConfirmPassword){
    setMessage("Passwords do not match");
    return;
   }
   if(password.length < 8){
    setMessage("Password must be at least 8 characters");
    return;
   }
   if(!email.includes("@")){
    setMessage("Please enter a valid email");
    return;
   }
   if(!email.includes(".")){
    setMessage("Please enter a valid email");
    return;
   }
   if(email.includes(" ")){
    setMessage("Please enter a valid email");
    return;
   }

   axios.post('http://localhost:5000/api/users/register', { name, email, password })
    .then(result => {
        if (result.data.user) {
            // If backend sends user data, it means auto-login was successful
            login(result.data.user); // Update auth context
            setMessage("Registration successful! Redirecting to dashboard...");
            setTimeout(() => navigate('/'), 1500); // Redirect to dashboard
        } else {
            // If no user data, redirect to login page as a fallback
            setMessage("Registration successful! Please log in.");
            setTimeout(() => navigate('/login'), 1500);
        }
    })
    .catch(err => {
        console.log(err);
        if (err.response) {
            setMessage(err.response.data.message);
        } else {
            setMessage("Network Error: Could not connect to the server. Please make sure it's running.");
        }
    });
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">
      <div className="bg-blue-950 bg-opacity-40 p-10 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-semibold text-center mb-2">
          Welcome to <span className="text-sky-400">PennyAI</span>
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Track Smarter. Spend Wiser.
        </p>

        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-left text-gray-300 mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
            <div className="mb-4">
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="********"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-sky-400 rounded-lg text-white font-semibold hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>

        {message && <p className="text-center mt-4 text-gray-200">{message}</p>}

        <div className="flex items-center justify-center mt-6">
          <div className="border-t border-gray-600 w-1/3"></div>
          <span className="mx-3 text-gray-400">or</span>
          <div className="border-t border-gray-600 w-1/3"></div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <button className="w-full py-2 bg-white text-black rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
          <button className="w-full py-2 bg-blue-600 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition">
            <img
              src="https://www.svgrepo.com/show/448224/facebook.svg"
              alt="Facebook"
              className="w-5 h-5"
            />
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
export default Register;