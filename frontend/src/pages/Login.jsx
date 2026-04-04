import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="w-full max-wd-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>

        <p>Login to continue your interview prepration</p>

        <input type="email" name="email" id="email" placeholder="Enter Email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
        />
        <button className="w-full bg-black text-white py-3">Login</button>

        <p>
          Dont have an account
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
