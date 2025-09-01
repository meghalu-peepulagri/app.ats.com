import { Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Header } from "src/components/an/Header";

export function Stats({ adminName, adminrole }: any) {
    const [userData, setUserData] = useState({
        name: adminName || '',
        user_type: adminrole || ''
      });

      const navigate = useNavigate();

      useEffect(() => {
        const storedUserData = Cookies.get('user_data');
        
        if (storedUserData) {
          try {
            const parsedUserData = JSON.parse(storedUserData);
            setUserData({
              name: parsedUserData.name || adminName || '',
              user_type: parsedUserData.user_type || adminrole || ''
            });
          } catch (error) {
            const userName = Cookies.get('name');
            const userType = Cookies.get('user_type');
            setUserData({
              name: userName || adminName || '',
              user_type: userType || adminrole || ''
            });
          }
        } else {
          const userName = Cookies.get('name');
          const userType = Cookies.get('user_type');
          
          if (userName || userType) {
            setUserData({
              name: userName || adminName || '',
              user_type: userType || adminrole || ''
            });
          }
        }
      }, [adminName, adminrole]);

      const handleLogout = () => {
        Cookies.remove("token");
        Cookies.remove("user_data");
        Cookies.remove("name");
        Cookies.remove("user_type");
        navigate({ to: "/" });
      };

    return(
        <div>
            <div>
               <Header adminrole={userData.user_type} adminName={userData.name} onLogout={handleLogout}/>
            </div>
            <Outlet />
        </div>
    )
}