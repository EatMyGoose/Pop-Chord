import "spectre.css"
import "spectre.css/dist/spectre-icons.css"
import "./App.css"
import { BaseLayout } from "./Pages/BaseLayout/BaseLayout";
import { ChordProgression } from "./Pages/ChordProgression/ChordProgression";
import { AllChords } from "./Pages/AllChords/AllChords";

import { 
  RouterProvider, 
  createBrowserRouter, 
  Route, 
  createRoutesFromElements} from "react-router-dom";

function PageRouter()
{
  return (
    createBrowserRouter(
      createRoutesFromElements(
        <Route
          path="/"
          element={<BaseLayout/>}
        >
          <Route index element={<ChordProgression/>}/>
          <Route
            path="all-chords"
            element={<AllChords/>}
          />
        </Route>
      )
    )
  )
}

const router = PageRouter();

function App() 
{
  return <RouterProvider router={router}/>;
}

export default App
