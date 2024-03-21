import {
    createBrowserRouter,
} from "react-router-dom";

import Materias from "../pages/Materias";
import Progresso from "../pages/Progresso";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Materias />,
        children:[
        ]
    },
    {
        path:"/Materias",
        element: <Materias />
    },
    {
        path:"/Progresso",
        element: <Progresso />
    },
    {
        path:"/Conquista",
        element: <Materias />
    },
    {
        path:"/Mapa",
        element: <Materias />
    }
]);


