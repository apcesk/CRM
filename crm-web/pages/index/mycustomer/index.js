import MyCustomer from '../../../components/customer/mycustomer';
import MainLayout from '../../../components/layout/main';
export default function Index(){
    // return <MyCustomer />
    return <MainLayout Div={new MyCustomer()} />
}