import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Outlet } from "react-router-dom";
import LoginPopup from "../../components/LoginPopup";

export default function PrivateRoute() {
  const { user } = useContext(AuthContext);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  const toggleLoginPopup = () => setLoginPopupOpen((prev) => !prev);

  if (!user || !user.tokens?.accessToken) {
    if (!isLoginPopupOpen) toggleLoginPopup();
    return <LoginPopup isOpen={isLoginPopupOpen} onClose={toggleLoginPopup} />;
  }
  return <Outlet />;
}
