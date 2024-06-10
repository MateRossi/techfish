function TanqueHeader({ nomeTanque }) {
    return (
        <div className='TankDetailsName'>
            <h3>Tanque</h3>
            <p>{nomeTanque}</p>
        </div>
    )
}

export default TanqueHeader;