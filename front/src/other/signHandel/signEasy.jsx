import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = "487136375105-drb87bl9gqht0854ug6d0oaqk0kqgdnr.apps.googleusercontent.com";

const Gbutton = () => {
  const handleGoogleSuccess = (response) => {
    console.log("Google Login Success:", response);
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin shape="circle"
        onSuccess={handleGoogleSuccess} 
        onError={handleGoogleFailure} 
      />
    </GoogleOAuthProvider>
  );
};

export default Gbutton;