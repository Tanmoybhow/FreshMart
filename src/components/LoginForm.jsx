import { useState } from "react";
import { createPortal } from "react-dom";
import TimedElement from "./TimedElement";
import { toast } from "react-toastify";

const LoginForm = ({ showLogin, setShowLogin,setUser,setShowElement,setCarts,setCartId,setCountCart }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [userArray,setUserArray] = useState(JSON.parse(localStorage.getItem('user')) || []);
  const [loginError, setLoginError] = useState({});
  const [signupError,setSignupError] = useState({})
  const [showSignUp, setShowSignUp] = useState(false);
  // let userArray;
  // if(JSON.parse(localStorage.getItem('user'))!=null){
  //   userArray = JSON.parse(localStorage.getItem('user'))
  // }else{
  //   userArray = [];
  // }
 
  console.log(setCartId)

  const loginValidate = () => {
    let loginErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // const users = JSON.parse(localStorage.getItem('user')) || [];
    const singleUser = userArray.find((el) => el.email === email && el.password=== password);
    if(!singleUser) {
      loginErrors.email = 'Invalid email & password';
    }else{
      setUser(singleUser);
      setCarts(singleUser.cart)
      localStorage.setItem('loggedUser',JSON.stringify(singleUser));
    }
    if (!email) loginErrors.email = "Email is required";
    else if(!emailRegex.test(email)) loginErrors.email = 'Invalid Email';
    if (!password) loginErrors.password = "Password is required";
    setLoginError(loginErrors);
    return Object.keys(loginErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginValidate()) {
      // console.log("Logging in with:", { email, password });
      setShowLogin(false);
      const updateUser = JSON.parse(localStorage.getItem('loggedUser'));
      setCountCart(()=>{
        return updateUser.cart.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.productQuantity;  
        }, 0);

      });
       toast.success(`Welcome to FreshMart, ${updateUser.username} `)


  }
  }
  const signupValidate = () =>{
    const signupErrors = {};
    if(!formData.username) signupErrors.username = 'Username is required';
    else if(formData.username.trim().length<3) signupErrors.username = 'Username should be atleast 3 cahracter';

    if(!formData.email) signupErrors.email = 'email is required'
    else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) signupErrors.email = 'invalid email';

    if(!formData.password) signupErrors.password = 'password is required';
    else if(formData.password.trim().length<3 || formData.password.trim().length>8) signupErrors.password = 'password is should be more than 3 and less than 8';
    else if(!/^(?=.*[A-Z])(?=.*\d)(?=.*[@-])[A-Za-z\d@-]+$/.test(formData.password)) signupErrors.password = 'password should be contain atleast one capital letter and one lowercase letter one number and special character (@ or -)';
    setSignupError(signupErrors);
    return Object.keys(signupErrors).length === 0 ;
  }

  const handleSignUp = (e)=>{
    e.preventDefault();
    if(signupValidate()){
        console.log("signup in with:", {formData });
        let id = crypto.randomUUID()
        const postFormData = {...formData,id,cart:[]}
        userArray.push(postFormData)
        setUserArray(userArray);
        localStorage.setItem('user',JSON.stringify(userArray));
        setFormData({
            username: "",
            email: "",
            password: "",
        });
        setShowSignUp(false);
        setCartId(0)
        
        
    }
    
  }

  return createPortal(
    <>
      {!showSignUp ? (
        <div className="flex justify-center items-center min-h-screen bg-[rgba(0,0,0,.7)] fixed w-full h-[100vh] top-0 left-0 z-50">
          <div style={{backgroundColor:'#f3f4f6'}} className="bg-gray-100 bg-opacity-50 p-6 rounded-lg shadow-lg w-[350px]">
            <div className="flex justify-between items-center text-gray-700 pb-5">
              <h2 className=" text-xl font-bold  mb-4">Login</h2>
              <i
                className="fa-solid fa-xmark cursor-pointer text-xl"
                onClick={() => setShowLogin(false)}
              ></i>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-9">
              {/* Email Field */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2  text-black rounded border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none "
                />
                {loginError.email && (
                  <p className="text-red-500 text-sm absolute -bottom-5 left-0">{loginError.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2  text-black rounded border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
                />
                {loginError.password && (
                  <p className="text-red-500 text-sm ">{loginError.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="main-button bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
              >
                Login
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-gray-400 text-sm text-center mt-4">
              Don't have an account?{" "}
              <span style={{color:'#ca8a04'}}
                className="cursor-pointer hover:underline"
                onClick={() => setShowSignUp(true)}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,.7)] w-full h-[100vh] top-0 left-0 z-50">
          <div style={{backgroundColor:'#f3f4f6'}} className="bg-opacity-50 p-6 rounded-lg shadow-lg w-[350px]">
            <div className="flex justify-between items-center text-gray-700 pb-5">
              <h2 className=" text-xl font-bold  mb-4">SignUp</h2>
              <i
                className="fa-solid fa-xmark cursor-pointer text-xl"
                onClick={() => setShowLogin(false)}
              ></i>
            </div>
            <form className="flex flex-col gap-3" onSubmit={handleSignUp}>
              <input
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full p-2  text-black rounded border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
              {signupError.username && (
                <p className="text-red-500 text-sm">{signupError.username}</p>
              )}

              <input
                type="text"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-2  text-black rounded border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
              {signupError.email && (
                <p className="text-red-500 text-sm">{signupError.email}</p>
              )}

              <input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-2  text-black rounded border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
              {signupError.password && (
                <p className="text-red-500 text-sm">{signupError.password}</p>
              )}

              <button
                type="submit"
                className="main-button-yellow bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
              >
                Sign Up
              </button>
            </form>

            {/* Login Link */}
            <p className="text-gray-400 text-sm text-center mt-4">
              Already have an account?{" "}
              <span
                style={{color:'#4ade80'}} className=" cursor-pointer hover:underline"
                onClick={() => setShowSignUp(false)}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      )}
    </>,

    document.getElementById("login-portal") // Portal Root
  );
};

export default LoginForm;
