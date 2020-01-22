import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';


import Main from './pages/Main'
import Profile from './pages/Profile'

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevRadar',
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Profile',
            }
        }
    }, {
        defaultNavigationOptions: {
            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor: "#7d40e7",
            },
            headerTitleAlign: "center"
        },
        mode: "card"
    })
)

export default Routes;