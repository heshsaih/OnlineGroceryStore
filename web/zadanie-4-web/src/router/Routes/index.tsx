import { Route, Routes } from "react-router-dom"
import PublicLayout from "../../layouts/PublicLayout"
import HomePageComponent from "../../pages/public/HomePageComponent"
import { publicRoutes } from "../routes"

const RoutesComponent = () => {
    return (
        <Routes>
            {publicRoutes.map(({ pathname, Component }) => {
                return <Route key={pathname} path={pathname} element={<PublicLayout Component={Component}></PublicLayout>}></Route>
            })}
            <Route path="*" element={<PublicLayout Component={HomePageComponent}></PublicLayout>}></Route>
        </Routes>
    )
}

export default RoutesComponent;