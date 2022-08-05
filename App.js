
import React ,{ useState,useEffect} from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import HomeScreen from './src/screen/HomeScreen';
import { withAuthenticator } from 'aws-amplify-react-native';
import * as Location from 'expo-location';

import Amplify ,{Auth,API,graphqlOperation} from 'aws-amplify';
import awsconfig from './src/aws-exports';

import { getCarId} from './src/graphql/queries'
import { createCar } from './src/graphql/mutations'

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

function App() {

  useEffect(() => {
     const updateUserCar = async () =>{
        // Get authenticator
        const authenticatedUser =  await Auth.currentAuthenticatedUser({bypassCache :true})
        if(!authenticatedUser){
          return 
        } 

        // check user has a car ?
        const carData = await API.graphql(
          graphqlOperation(
            getCarId,
            { id : authenticatedUser.attributes.sub }
          )
        )

        if(!!carData.data.getCar){
          console.log("User has a car !");
          return
        }

        //if Not ,create a new car 
        const newCar ={
          id : authenticatedUser.attributes.sub,
          type: 'UberX',
          userId :authenticatedUser.attributes.sub,
        }
        await API.graphql(
          graphqlOperation(
            createCar,{input :newCar}
          )
        )

     }

     updateUserCar();
  },[])

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <> 
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <HomeScreen />
      </SafeAreaView> 
    </>
  );
}

export default withAuthenticator(App);