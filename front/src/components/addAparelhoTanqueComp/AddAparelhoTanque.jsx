import './AddAparelhoTanque.css'
import useAuth from '../../hooks/use-auth';
import useAxiosPrivate from '../../hooks/use-axios-private';

function AddAparelhoTanque() {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    return <div>teste</div>
}

export default AddAparelhoTanque;