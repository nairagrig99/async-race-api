import { createContext } from "react";

export interface PageStateInterface {
    page: number;
}

export type PageContextType = {
    state: PageStateInterface;
    pageState: (page: number) => void;
}

export const PageContext = createContext<PageContextType>({
    state: { page: 1 },
    pageState: () => {}
});