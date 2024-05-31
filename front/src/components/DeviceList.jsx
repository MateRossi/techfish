import DeviceInfoList from "./DeviceInfoList";

function DeviceList({ devices }) {
    const renderedDevices = devices ? devices.map((device) => {
        return <DeviceInfoList key={device.id} deviceId={device.id} currentValues={{ 'Ph': device.ph, 'temperatura': device.temperatura, 'tds': 456 }} />
    }) : [];
    
    return (
        {renderedDevices}
    )
}

export default DeviceList;