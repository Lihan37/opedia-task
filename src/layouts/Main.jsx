import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className='mb-32 max-w-screen-xl'>
                <Navbar></Navbar>
            </div>
            <div className="flex-1">
                <Outlet />
            </div>
            
        </div>
    );
};

export default Main;