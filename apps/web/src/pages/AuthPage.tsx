import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import UserLoginForm from '@/components/user-login-form';
import { useState } from 'react';
import UserRegistrationForm from '@/components/user-registration-form';

export default function AuthenticationPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side with Image and Overlay Text */}
      <div className="relative w-full h-screen lg:w-1/2 hidden lg:block">
        <img
          src="https://theproductmanager.com/wp-content/uploads/sites/4/2022/03/PRD-Product-Roadmap-featured-image-1280x720.png"
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col p-10">
          <div className="flex items-center text-2xl font-bold space-x-2">
            <span className="flex justify-between text-ring dark:text-primary">
              Nodemap
            </span>
            <img className="h-10 w-auto" src={logo} alt="Jaqsylyq" />
          </div>
          <blockquote className="flex-1 flex flex-col mt-auto justify-end text-white">
            <p className="text-xl">
              "This web application helpes me learn anything I want with
              detailed instructions how to achieve each goal. Highly
              recommended!"
            </p>
            <footer className="text-lg">Aidar Nugmanoff</footer>
          </blockquote>
          <div className="text-right">{/* Login or other links here */}</div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center p-10">
        <div className="max-w-md mx-auto flex flex-col justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-6 justify-self-center">
              {isLogin ? 'Login' : 'Registration'}
            </h1>
            <p className="mb-2 justify-self-center">
              {isLogin
                ? 'Enter your data to login'
                : 'Enter your data to registration'}
            </p>
          </div>
          {isLogin ? <UserLoginForm /> : <UserRegistrationForm />}
          <p className="mt-4 text-xs self-center">
            {isLogin ? (
              <span className="text-lg">
                Still without account?{' '}
                <a
                  href="#"
                  onClick={toggleForm}
                  className="underline cursor-pointer"
                >
                  Register!
                </a>
              </span>
            ) : (
              <span className="text-lg self-center">
                Already registered?{' '}
                <a
                  href="#"
                  onClick={toggleForm}
                  className="underline cursor-pointer"
                >
                  Login!
                </a>
              </span>
            )}
          </p>
          {!isLogin && (
            <p className="mt-4 text-xs ">
              By clicking continue, you agree to our
              <Link to="/terms" className="underline">
                Terms of Service{' '}
              </Link>
              and{' '}
              <Link to="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
