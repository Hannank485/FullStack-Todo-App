import { useRef, useState } from "react";
import { FiCoffee } from "react-icons/fi";
export default function AuthPage({
  isRegistered,
  setRegistered,
  handleSubmit,
  authError,
  authSuccess,
}: {
  authSuccess: string | null;
  authError: string | null;
  isRegistered: boolean;
  setRegistered: () => void;
  handleSubmit: (username: string, password: string) => void;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative h-screen bg-bg ">
      <div className="bg-card md:w-md w-xs rounded-4xl shadow-lg  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[75dvh] flex items-center flex-col py-7  border border-border  ">
        <div className="flex flex-col items-center ">
          <p className="p-3 mb-2 text-5xl rounded-full bg-rose-50 text-rose-600 ">
            <FiCoffee />
          </p>
          <h1 className="text-2xl font-bold ">
            {isRegistered ? "Welcome Back" : "Register"}
          </h1>
          <p className="text-sm text-subtext">Let's get cozy and productive.</p>
        </div>
        {authSuccess && (
          <p className="p-3 mt-4 text-xs font-semibold text-center bg-green-50 text-green-600 rounded-xl">
            {authSuccess}
          </p>
        )}
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(username, password);
            formRef.current?.reset();
          }}
          className="flex flex-col w-full px-8 py-5"
          action="/"
        >
          <label htmlFor="user" className="text-sm ">
            Username
          </label>
          <input
            type="text"
            name="user"
            placeholder="Name"
            className="p-3 duration-150 bg-input h-13 rounded-2xl focus:outline-0 focus:border-rose-100 focus:border-4 mb-7 transition-color "
            required
            maxLength={15}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label htmlFor="user" className="text-sm ">
            Password
          </label>
          <input
            type="password"
            name="pw"
            placeholder="Password"
            className="p-4 duration-150 bg-input h-13 rounded-2xl focus:outline-0 focus:border-rose-100 focus:border-4 transition-color mb-7 "
            minLength={6}
            maxLength={15}
            required
            autoComplete="off"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {authError && (
            <p className="p-3 mb-4 text-xs font-semibold text-center bg-rose-50 text-rose-600 rounded-xl">
              {authError}
            </p>
          )}
          <button className="py-4 font-bold bg-accent rounded-2xl text-card hover:bg-[#f65f78] cursor-pointer">
            {isRegistered ? "Enter Dashboard" : "Register Now"}
          </button>
        </form>
        <p>
          {isRegistered
            ? "Dont Have An Account? "
            : "Already Have An Account? "}
          <span
            className="font-semibold cursor-pointer select-none text-accent hover:underline"
            onClick={() => {
              setRegistered();
            }}
          >
            {isRegistered ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
}
