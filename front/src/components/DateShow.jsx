function DateShow({ formatedDate }) {
    return (
        <div className='DateTime'>
            <h3> Última Atualização </h3>
            <p>{formatedDate}</p>
        </div>
    )
}

export default DateShow;