import { useNavigate } from "react-router-dom";
import DeviceInfoList from "../components/DeviceInfoList";
import TankName from "./TankName";
import DateShow from "./DateShow";

function TankListItem({ tankName }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/tanque');
    }

    return (
        <div onClick={handleClick} >
            <div className="TankItemContainer">
                <header className="tankItemHeader">
                    <DateShow formatedDate={'31/05/2025 15:34'}/>
                    <TankName tankName={tankName} />
                </header>
                <DeviceInfoList deviceId={'APES007'} currentValues={{ 'Ph': 7, 'temperatura': 9, 'tds': 456 }} />
                <DeviceInfoList deviceId={'APES008'} currentValues={{ 'Ph': 6.66, 'temperatura': 23, 'tds': 444 }} />
                <DeviceInfoList deviceId={'APES009'} currentValues={{ 'Ph': 5.45, 'temperatura': 19, 'tds': 300 }} />
            </div>
        </div>
    )
}

export default TankListItem;