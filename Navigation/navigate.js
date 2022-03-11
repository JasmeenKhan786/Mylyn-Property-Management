import React from "react"
import AddPayments from "../screens/addpayments"
import AddProperty from "../screens/addproperty"
import AddTenant from "../screens/addtenants"
import AllTenants from "../screens/alltenants"
import Home from "../screens/home"
import Login from "../screens/login"
import Payments from "../screens/payments"
import Properties from "../screens/properties" 
import SignUp from "../screens/signUp"
import Tenant from "../screens/tenants"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '../screens/loading'


const Stack2 = createStackNavigator()



function HomeStack() {
  return(
    <Stack2.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Stack2.Screen name="Home" component={Home}/>
      <Stack2.Screen name="Property" component={PropertyStack} />
      <Stack2.Screen name="Payment" component={PaymentStack}/>
      <Stack2.Screen name="Tenant" component={TenantStack}/>
    </Stack2.Navigator>
  )
}

const Stack3 = createStackNavigator()

function PropertyStack() {
  return(
    <Stack3.Navigator screenOptions={{headerShown: false}}>
      
      <Stack3.Screen name="Properties" component={Properties} />
      <Stack3.Screen name="Home" component={Home}/>
      <Stack3.Screen name="AddProperty" component={AddProperty} />
      <Stack3.Screen name="Tenant" component={Tenant} />
      <Stack3.Screen name="AddTenant" component={AddTenant} />
    </Stack3.Navigator>
  )
}

const Stack4 = createStackNavigator()

function PaymentStack() {
  return(
    <Stack4.Navigator screenOptions={{headerShown: false}}>
    
      <Stack4.Screen name="Payments" component={Payments}/>
      <Stack4.Screen name="Home" component={Home}/>
      <Stack4.Screen name="AddPayment" component={AddPayments}/>
      
    </Stack4.Navigator>
  )
}

const Stack5 = createStackNavigator()

function TenantStack() {
  return(
    <Stack5.Navigator screenOptions={{headerShown: false}}>
      <Stack5.Screen name="AllTenant" component={AllTenants} />
      <Stack5.Screen name="Tenant" component={Tenant}/>
      
    </Stack5.Navigator>
  )
}



const Drawer = createBottomTabNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Home" component={Home} options={{tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )
          }}/> 
      <Drawer.Screen name="Property" component={PropertyStack}
      options={{tabBarLabel: 'Property',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-city" color={color} size={size} />
          )
          }}/> 
      <Drawer.Screen name="Payment" component={Payments}
      options={{tabBarLabel: 'Payments',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash-multiple" color={color} size={size} />
          )
          }}/>

    </Drawer.Navigator>
  );
}

const Stack1 = createStackNavigator();

function LoginStack() {
  return (
    <Stack1.Navigator screenOptions={{headerShown: false}}>
      <Stack1.Screen name="Loading" component={Loading} />
    
      <Stack1.Screen name="Login" component={Login} />
      <Stack1.Screen name="SignUp" component={SignUp} />
      <Stack1.Screen name="Home" component={MyDrawer} />
    </Stack1.Navigator>
  );
}



export default LoginStack