import { RouterProvider } from "react-router-dom"
import { router } from "./routes/routes"


function App() {

  return (
    <div className="w-screen h-screen mx-4 my-4 bg-background">
      <RouterProvider router={router} />  
    </div>
  )
}

export default App
