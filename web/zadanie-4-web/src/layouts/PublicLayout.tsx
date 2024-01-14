import Navbar from "../components/Navbar";
import SidePanelComponent from "../components/SidePanel";

const PublicLayout = ({ Component }: { Component: React.FC }) => {
    return (
        <div id="public-layout">
            <Navbar></Navbar>
            <div id="component">
                <Component></Component>
            </div>
        </div>
    )
}

export default PublicLayout;