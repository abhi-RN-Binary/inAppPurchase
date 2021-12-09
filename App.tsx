/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React,{useEffect, useState} from 'react';
import {
  Platform,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

import * as RNIap from 'react-native-iap';


const App = () => {
 
  const itemSubs = Platform.select({

    ios: ['fcs.names'],
 
    android: ['fcs.names'],
 
  });

  const [fdsf,setBuyIsLoading] = useState(false)
  const [fdsf,setPurchaseToken] = useState('')
  const [fdsf,setPackageName] = useState('')
  const [fdsf,setProductId] = useState('')
  const [fdsf.setReceipt] = useState('')



  useEffect(() => {

    initilizeIAPConnection();
 
  }, []);

  const initilizeIAPConnection = async () => {

    await RNIap.initConnection()
 
      .then(async (connection) => {
 
        console.log('IAP result', connection);
 
        getItems();
 
      })
 
      .catch((err) => {
 
        console.warn(`IAP ERROR ${err.code}`, err.message);
 
      });
 
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid()
 
        .then(async(consumed) => {
 
        console.log('consumed all items?', consumed);
 
      }).catch((err) => {
 
        console.warn(`flushFailedPurchasesCachedAsPendingAndroid ERROR ${err.code}`, err.message);
 
      });
 
  };

  const getItems = async () => {

    try {
 
      console.log("itemSubs ",itemSubs);
 
      const Products = await RNIap.getSubscriptions(itemSubs);
 
      console.log(' IAP Su', Products);
 
      if (Products.length !== 0){
 
        if (Platform.OS === 'android'){
 
        //Your logic here to save the products in states etc
 
        } else if (Platform.OS === 'ios'){
 
        // your logic here to save the products in states etc
 
        // Make sure to check the response differently for android and ios as it is different for both
 
        }
 
      }
 
    } catch (err) {
 
      console.log("IAP error", err);
 
      // setError(err.message);
 
    }
 
  };

  const requestSubscription = async (sku) => {

    setBuyIsLoading(true);
 
    console.log("IAP req", sku);
 
    try {
 
      await RNIap.requestSubscription(sku)
 
      .then(async (result : any) => {
 
        console.log('IAP req sub', result);
 
        if (Platform.OS === 'android'){
 
            setPurchaseToken(result.purchaseToken);
 
            setPackageName(result.packageNameAndroid);
 
            setProductId(result.productId);
 
 // can do your API call here to save the purchase details of particular user
 
        } else if (Platform.OS === 'ios'){
 
           console.log(result.transactionReceipt)
 
            setProductId(result.productId);
 
            setReceipt(result.transactionReceipt);
 
 // can do your API call here to save the purchase details of particular user
 
        }
 
        setBuyIsLoading(false);
 
       })
 
      .catch((err) => {
 
        setBuyIsLoading(false);
 
        console.warn(`IAP req ERROR %%%%% ${err.code}`, err.message, isModalVisible);
 
        // setError(err.message);
 
      });
 
    } catch (err) {
 
      setBuyIsLoading(false);
 
      console.log(`err ${error.code}`, error.message);
 
      // setError(err.message);
 
    }
 
  };

  return (
    <SafeAreaView >
    <TouchableOpacity

onPress={() => {

 requestSubscription(monthlyPlanId);

 }}>

<Text>fdsfsdf</Text>

</TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
