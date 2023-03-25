import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { signInWithGoogle } from "../utils/firebase";
// import "./Home.css";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Home() {
  // const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();
  const { address } = useAccount();

  useEffect(() => {
    if (address) history("/dashboard");
  }, [address]);

  return (
    <div className="home">
      <div className="home__container">
        {/* <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/59/Google_Classroom_Logo.png"
          alt="Google Classroom Image"
          className="home__image"
        /> */}
        {/* <button className="home__login" onClick={signInWithGoogle}> */}
        <ConnectButton />
        {/* </button> */}
      </div>
    </div>
  );
}

export default Home;
