import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import App from "../App";
import DeviceModal from "../devicemodal/DeviceModal";
import Navbar from "../header/Header";
import DeviceTable from "../devicetable/DeviceTable";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/DeviceModal">
                <DeviceModal/>
            </ComponentPreview>
            <ComponentPreview path="/Navbar">
                <Navbar/>
            </ComponentPreview>
            <ComponentPreview path="/DeviceTable">
                <DeviceTable/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews