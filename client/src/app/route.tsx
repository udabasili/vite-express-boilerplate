import {useEffect} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {io} from "socket.io-client";

import Root from "./routes/root.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
    },
]);


export const AppRouter = () => {

    useEffect(() => {
        const socket = io(import.meta.env.VITE_SERVER_API_URL);
        socket.connect();
    }, []);

    console.log(router);
    return (
        <RouterProvider router={router}/>
    )
}
