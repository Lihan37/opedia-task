import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";
import Footer from "../Pages/Footer/Footer";

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className='max-w-screen-2xl'>
                <Navbar></Navbar>
            </div>
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;