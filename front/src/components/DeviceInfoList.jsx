function DeviceInfoList({ currentValues, deviceId }) {
    const renderedListItems = currentValues ? Object.keys(currentValues).map((attribute) => {
        const value = currentValues[attribute];
        return (
            <li key={attribute} >
                {attribute}: {value}
            </li>
        );
    }) : [];

    return (
        <>
            Aparelho: {deviceId}
            <ul className="device-info-list">{renderedListItems}</ul>
        </>
    );
}

export default DeviceInfoList;