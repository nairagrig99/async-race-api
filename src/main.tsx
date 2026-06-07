import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import GaragePage from "./Pages/GaragePage.tsx";
import WinnersPage from "./Pages/WinnersPage.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {WinnerModalProvider} from "./contextStore/WinnerModalProvider.tsx";
import PageProvider from "./contextStore/PageProvider.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {path: '/garage', element: <GaragePage/>},
            {path: '/winners', element: <WinnersPage/>},
        ]
    },
    {
        basename: '/',
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <WinnerModalProvider>
            <PageProvider>
                <Provider store={store}>
                    <RouterProvider router={router}/>
                </Provider>
            </PageProvider>
        </WinnerModalProvider>
    </StrictMode>,
)
