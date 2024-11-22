import {AppProvider} from "./provider.tsx";
import {AppRouter} from "./route.tsx";

export const App = () => {
    return (
        <AppProvider>
            <AppRouter/>
        </AppProvider>
    )
}