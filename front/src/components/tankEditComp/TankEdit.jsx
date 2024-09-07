import { useState } from "react";
import useAxiosPrivate from "../../hooks/use-axios-private";
import useAuth from "../../hooks/use-auth";
import './TankEdit';

function TankEdit({ tanqueIcon, tanque, handleEdit }) {
    return (
        <div>
            <img src={tanqueIcon} className='modal-icon' alt="ícone de um tanque de peixes" />
            {errMsg && <p className="errMsg">{errMsg}</p>}
        </div>
    );
}

export default TankEdit;