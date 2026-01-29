import { Link, Outlet } from "react-router-dom";
import bgImage from "@/assets/images/bg-main.jpg";
import { Toaster } from "sonner";
const AppLayout = () => {
    return (

        <div className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <main className="container mx-auto pt-4  ">
                <div className=" backdrop-blur-md px-3 py-4 mb-4 bg-background/50 font-medium rounded-xl flex items-center justify-between text-white" >
                    <Link to="/">Elevate</Link>
                    <p>Frontend Advanced Boot camp Task</p>
                    <p></p>
                </div>
                <div className="h-[calc(100vh-95px)] ">
                    <Outlet />

                </div>
                <Toaster richColors position="bottom-right" />
            </main>
        </div>
        

    );
};

export default AppLayout;
