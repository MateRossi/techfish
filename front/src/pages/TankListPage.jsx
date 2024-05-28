import { useNavigate } from "react-router-dom";

function TankListPage() {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/tanque');
    }
    
    return (
        <main className="Page">
            <button onClick={handleClick}>
                <div style={{ width: 400, height: 400, backgroundColor: 'gray' }}>Tanque 001132</div>
            </button>
        </main>
    )
}

export default TankListPage;