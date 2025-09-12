/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Boxo from '@appboxo/react-native-sdk';

const App = () => {
  Boxo.setConfig('352131', {
             enableMultitaskMode: true,
             sandboxMode: false,
             isDebug: true,
             showClearCache: false,
             showAboutPage : false,
             showPermissionsPage: false
  });

  const openMiniapp = () => {
    Boxo.openMiniapp('app16973');
  };

  React.useEffect(() => {
    const customEventsSubscription = Boxo.customEvents.subscribe(
      (event) => {
        console.log(event.app_id, ' custom event: ', event)
        const newEvent = {
          app_id: event.app_id,
          custom_event: {
            payload: {payment: 'received'},
            request_id: event.custom_event.request_id,
            type: event.custom_event.type,
          },
        };
        Boxo.customEvents.send(newEvent);
      },
    );

    const paymentEventsSubscription = Boxo.paymentEvents.subscribe(
      (event) => {
        console.log(event.app_id, ' payment event: ', event)
        const newEvent = {
          app_id: event.app_id,
          payment_event: {
            ...event.payment_event,
            status: 'success'
          },
          };
        Boxo.paymentEvents.send(newEvent);
      },
    );

    const lifecycleEventsSubscription = Boxo.lifecycleHooksListener({
          onLaunch: (appId: string) => console.log(appId, 'onLaunch'),
          onResume: (appId: string) => console.log(appId, 'onResume'),
          onClose: (appId: string) => console.log(appId, 'onClose'),
          onPause: (appId: string) => console.log(appId, 'onPause'),
          onAuth: (appId: string) => {
            console.log(appId, 'onAuth');

            fetch('https://demo-hostapp.appboxo.com/api/get_auth_code/')
            .then((response) => {
              if (!response.ok) {
                console.error('Error fetching auth code:');
                Boxo.setAuthCode(appId, '');
              }
              return response.json();
            })
            .then((data) => {
              Boxo.setAuthCode(appId, data.auth_code);
            })
          },
          onError: (appId: string, error: string) =>
            console.log(appId, 'onError', error),
        });

    return () => {
      lifecycleEventsSubscription();
      customEventsSubscription();
      paymentEventsSubscription();
    };
  }, []);


  return (
      <View style={styles.container}>
        <Button title="Open miniapp" onPress={openMiniapp}/>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default App;


