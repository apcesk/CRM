import EditCustomer from '../../../components/customer/editCustomer';
import MainLayout from '../../../components/layout/main';
export default function Add(){
    return <MainLayout Div={new EditCustomer()} />
}