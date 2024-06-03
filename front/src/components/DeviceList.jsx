import DeviceInfoList from "./Device";

function DeviceList({ devices }) {
    console.log(typeof devices);
    
    const renderedDevices = devices ? devices.map((device) => {
        return <DeviceInfoList key={device.id} deviceId={device.id} currentValues={{ 'Ph': device.ph, 'temperatura': device.temperatura, 'tds': 456 }} />
    }) : [];
    
    return (
        {renderedDevices}
    )
}

export default DeviceList;