import {PageContext} from "./PageContext.tsx";
import {type ReactNode, useState} from "react";

export default function PageProvider({children}: { children: ReactNode }) {
    const [state, setPage] = useState(1);
    const pageState = (page: number) => {
        setPage(page);
    }

    return <PageContext.Provider value={{state: {page: state}, pageState}}>
        {children}
    </PageContext.Provider>
}