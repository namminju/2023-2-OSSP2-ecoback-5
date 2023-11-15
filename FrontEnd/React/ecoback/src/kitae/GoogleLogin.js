import {GoogleLogin} from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../css/GoogleLoginButton.css";
const GoogleLoginButton = () => {
    const clientId = 'clientID'
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    className="google-login-button"
                    onSuccess={(res) => {
                        console.log(res);
                    }}
                    onFailure={(err) => {
                        console.log(err);
                    }}
                />
            </GoogleOAuthProvider>
        </>
    );
};

export default GoogleLoginButton
