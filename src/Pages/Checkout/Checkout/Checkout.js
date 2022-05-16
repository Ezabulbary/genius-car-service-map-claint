import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useServiceDetail from '../../../hooks/useServiceDetail';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service, setService] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);

    // const [user, setUser] = useState({
    //     name: 'ezabul bari',
    //     email: 'ezabul.bary@gmail.com',
    //     address: 'Nager bazar bagrat',
    //     phone: '01711111111'
    // })

    // const handleAddressChange = event => {
    //     console.log(event.target.value)
    //     const { address, ...rest } = user;
    //     const newAddress = event.target.value;
    //     const newUser = { address: newAddress, ...rest };
    //     console.log(newUser)
    //     setUser(newUser)
    // }

    const handleOnSubmit = event => {
        event.preventDefault()
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event?.target?.address?.value,
            phone: event.target.phone.value
        }
        axios.post('https://gentle-retreat-61995.herokuapp.com/order', order)
            .then(response => {
                const { data } = response;
                if (data.insertedId) {
                    toast('Your order is booked!!!');
                    event.target.reset();
                }
            })
    }

    return (
        <div className='w-50 mx-auto text-center'>
            <h2>Please Order: {service.name}</h2>
            <form onSubmit={handleOnSubmit}>
                <input className='w-100 mb-2' type="text" value={user?.displayName} name="name" placeholder='name' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="email" value={user?.email} name="email" placeholder='email' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="text" value={service.name} name="service" placeholder='service' required readOnly />
                <br />
                <input className='w-100 mb-2' type="text" name="address" placeholder='address' autoComplete='off' required />
                <br />
                <input className='w-100 mb-2' type="text" name="phone" placeholder='phone' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Place Order" />
            </form>
        </div>
    );
};

export default Checkout;