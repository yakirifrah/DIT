import { Navigation } from 'react-native-navigation';
import falseIcon from '../../../assets/icons/Map_Pin.png';
import Icon from "react-native-vector-icons/Ionicons";

const LoadTabs = ()=>{
    Promise.all([
        Icon.getImageSource('bars',20,'white'),
        Icon.getImageSource('ios-home-outline',20,'white'),
        Icon.getImageSource('ios-chatbubbles-outline',20,'white'),
        Icon.getImageSource('ios-contact-outline', 20, 'white'),


    ]).then(sources =>{
        Navigation.startTabBasedApp({
            tabs:[
                {
                screen:"Dit.Home",
                label: "Home",
                title:"Home",
                icon:sources[1],
                },
                {
                screen:"Dit.AddPost",
                label: "Chat",
                title:"Chat",
                icon:sources[2],
                },
                {
                screen:"Dit.Profile",
                label: "Profile",
                title: "Profile",
                icon: sources[3],
                }
                
            ],
            tabsStyle: {
                navBarComponentAlignment: 'center',
                navBarTitleTextCentered: true, 
            },
            animationType: 'fade',
         
            
        })

    })
    
}
export default LoadTabs;