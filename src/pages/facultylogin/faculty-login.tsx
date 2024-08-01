/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { loginFaculty } from "@/services/auth";
import { setCookie } from "@/lib/cookie";
import useAuth from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";

function FacultyLogin() {
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const permission = useAuth();

  //for show and hide password!
  const [showPassword, setShowPassword] = useState(false);
 

  const handleUserLoginClick = () => {
    navigate('/login', { replace: true });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  // Remove error messages on input
  useEffect(() => {
    if (error) setError("");
  }, [name, password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Submit to backend
    const response = await loginFaculty(name, password);

    if (!response.token) {
      setError(response);
      return;
    }

    const { token, permission} = response;
    // set browser cookies
    setCookie("token", token);
    setCookie("permission", permission);
    localStorage.setItem('facultyName', name); // Store name in localStorage
    
    if (password === 'DECE123') {
      alert('Your password is the default one. Please go to settings and change your password.');
      navigate('../viewfaculty/Settings', { replace: true }); // Navigate to the settings page
    } else {
      // Navigate based on permission
      if (permission === 'faculty') navigate('/viewfaculty', { replace: true });
    }
  };

  
  if (permission) return;

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-tr from-sky-400 to-indigo-800">
      <main className="flex h-fit   w-full flex-col gap-4 bg-white p-4 drop-shadow-2xl sm:w-[400px] sm:rounded-xl">
      <h1 className="font-bold text-center"> FACULTY'S LOGIN PAGE </h1>
        <div className="flex h-32 items-center justify-center">
          <img src="/logo.png" />
        </div>

        <form
          onSubmit={handleSubmit}
          id="login-form"
          className="flex w-full flex-col gap-2"
        >
          <label className="font-bold" htmlFor="name">
            Full Name 
            <h1 className="font-light italic text-sm">Format: First name Middle Initial Surname</h1>
          </label>

          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />


          <label className="font-bold" htmlFor="password">
            Password
          </label>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span 
          style={{
            position: 'relative',
            right: '-340px',
            bottom: '30px',
            transform: 'translateY(-50%)',
            cursor: 'pointer'
          }} onClick={togglePasswordVisibility}>

            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </form>

        {error && <p className="text-center text-xs text-red-400">*{error}*</p>}

        <Button type="submit" form="login-form" className="bg-blue-600 hover:bg-blue-700">
          Login
        </Button>
        
        <Button  onClick={handleUserLoginClick} className="bg-blue-600 hover:bg-blue-700" >
          Go to User Login
        </Button>        
        
        

      </main>
    </div>
  );
}

export default FacultyLogin;
