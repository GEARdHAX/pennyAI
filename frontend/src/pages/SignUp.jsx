import React , {useState} from "react";
function Register(){
    const [FirstName,setFirstName] = useState("")
    const [LastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [ConfirmPassword,setConfirmPassword] = useState("")
    const [message,setMessage] = useState("")

const handleSubmit =(e)=>{
   e.preventDefault();
   if(FirstName === "" || LastName === "" || email === "" || password === "" || ConfirmPassword === ""){
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
            <label className="block text-left text-gray-300 mb-2">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 rounded-lg bg-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={email}
              onChange={(e) => setLastName(e.target.value)}
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
            {/* <p className="text-right text-sm text-sky-400 hover:underline cursor-pointer mt-1">
              Forgot Password?
            </p> */}
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