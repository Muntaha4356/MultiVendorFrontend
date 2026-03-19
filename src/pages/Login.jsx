import { React, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/styles";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../server";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();


  useEffect(()=>{
    if(isAuthenticated){
      navigate("/")
    }
  })
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (password.length < 4) {
      return alert("Password must be at least 4 characters long.");
    }
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      });
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        navigate("/");
        window.location.reload(true)
      })
      .catch((err) => {
        // toast.error(err.response.data.message);
        console.log(err)
      });

  }
  const handleFileInputChange = (e) => {
    const file = e.target.files[0]; // get the first file
    if (file) {
      setAvatar(file);
    }
  };

  return (
    <form
      onSubmit={state === "register" ? handleSubmitRegister : handleSubmitLogin}
      className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
    >
      <p className="text-2xl font-medium m-auto">
        <span className="text-indigo-500">User</span>{" "}
        {state === "login" ? "Login" : "Sign Up"}
      </p>
      {state === "register" && (
        <div className="w-full">
          <p>Name</p>
          <input
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="text"
            required
          />
        </div>
      )}
      <div className="w-full ">
        <p>Email</p>
        <input
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="email"
          required
        />
      </div>
      <div className="w-full relative">
        <p>Password</p>
        <input
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type={visible ? "text" : "password"}
          required
        />
        {visible ? (
          <AiOutlineEye
            className="absolute right-2 bottom-2 cursor-pointer"
            size={25}
            onClick={() => setVisible(false)}
          />
        ) : (
          <AiOutlineEyeInvisible
            className="absolute right-2 bottom-2 cursor-pointer"
            size={25}
            onClick={() => setVisible(true)}
          />
        )}
      </div>
      <div className={`flex justify-between md:gap-2`}>
        <div className={`${styles.normalFlex}`}>
          <input
            type="checkbox"
            name="remember-me"
            id="remember-me"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gay-300 rounded "
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-90"
          >
            Remember Me
          </label>
        </div>
        <div className="text-sm">
          <a
            href=".forgot-password"
            className={`font-medium text-blue-600 hover:text-blue-500 ${
              state === "register" ? "hidden" : "block"
            }`}
          >
            Forgot your password?
          </a>
        </div>
      </div>
      {state === "register" ? (
        <p>
          Already have account?{" "}
          <span
            onClick={() => setState("login")}
            className="text-indigo-500 cursor-pointer"
          >
            click here
          </span>
        </p>
      ) : (
        <p>
          Create an account?{" "}
          <span
            onClick={() => setState("register")}
            className="text-indigo-500 cursor-pointer"
          >
            click here
          </span>
        </p>
      )}
      <div className={`${state === "register" ? "block" : "hidden"}`}>
        <label
          htmlFor="avatar"
          className="block text-sm font-medium text-gray-700"
        ></label>
        <div className="mt-2 flex items-center">
          <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
            {avatar ? (
              <img
                src={URL.createObjectURL(avatar)}
                alt="avatar"
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <RxAvatar className="h-8 w-8" />
            )}
          </span>
          <label
            htmlFor="file-input"
            className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <span>Upload a file</span>
            <input
              type="file"
              name="avatar"
              id="file-input"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileInputChange}
              className="sr-only"
            />
          </label>
        </div>
      </div>
      <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
        {state === "register" ? "Create Account" : "Login"}
      </button>
    </form>
  );
};

export default Login;
