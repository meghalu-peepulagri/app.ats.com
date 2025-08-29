import { Outlet } from "@tanstack/react-router";
import { Header } from "../an/Header";

export function Stats({adminrole,adminName}){
    return(
        <div>
            <div>
               <Header adminrole={adminrole} adminName={adminName}/>
            </div>
            <Outlet />
        </div>
    )
}