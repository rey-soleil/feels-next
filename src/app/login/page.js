"use client";

import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import "../styles/App.css";

export default function Login() {
  const router = useRouter();

  const successfullySignIn = (response) => {
    const user = jwtDecode(response.credential);
    localStorage.setItem("user", JSON.stringify(user));
    router.push("/");
  };

  return (
    <GoogleOAuthProvider clientId="240802778667-9pq3p85jaq03okf5on2evrb9p8qtf4ok.apps.googleusercontent.com">
      <div className="login">
        <div className="login-info">
          <div className="login-info-row">
            <div className="login-icon">
              <AutoStoriesIcon />
            </div>
            <p>
              <i>feels</i> is a web app for logging what you're feeling and what
              you're doing.
            </p>
          </div>
          <div className="login-info-row">
            <div className="login-icon">
              <SelfImprovementIcon />
            </div>
            <p>
              Studies show that labeling your emotions provides emotional
              clarity and helps relieve stress.
            </p>
          </div>{" "}
          <div className="login-info-row">
            <div className="login-icon">
              <AutoGraphIcon />
            </div>
            <p>
              Over time, <i>feels</i> will give you personalized insights about
              your moods.
            </p>
          </div>
        </div>
        <div>
          <h4 className="ready-to-start">
            <b>Ready to get started?</b>
          </h4>
        </div>
        <div className="google-login">
          <GoogleLogin
            onSuccess={successfullySignIn}
            onError={(res) => console.log(`error: ${res}`)}
            useOneTap
          />
        </div>
      </div>{" "}
    </GoogleOAuthProvider>
  );
}
