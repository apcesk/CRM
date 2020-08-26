import MyCustomer from '../../../components/customer/mycustomer';
import MainLayout from '../../../components/layout/main';
export default function Index(){
    return <MainLayout Div={new MyCustomer()} />
}