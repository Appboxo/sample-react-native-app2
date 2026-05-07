/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Boxo from '@appboxo/react-native-sdk';
import type { BoxoPaymentEvent } from '@appboxo/react-native-sdk';
import { BottomTabBar } from './src/components/BottomTabBar';
import type { TabRoute } from './src/navigation/tabRoutes';
import { HomeTab } from './src/screens/HomeTab';
import { ExploreTab } from './src/screens/ExploreTab';
import { PaymentTab } from './src/screens/PaymentTab';

const App = () => {
  const [tab, setTab] = React.useState<TabRoute>('home');
  const [pendingPayment, setPendingPayment] =
    React.useState<BoxoPaymentEvent | null>(null);
  const [lastPaymentOutcome, setLastPaymentOutcome] = React.useState<
    string | null
  >(null);

  const handleConfirmPay = React.useCallback(() => {
    if (pendingPayment == null) {
      return;
    }
    const newEvent: BoxoPaymentEvent = {
      app_id: pendingPayment.app_id,
      payment_event: {
        ...pendingPayment.payment_event,
        status: 'success',
      },
    };
    Boxo.paymentEvents.send(newEvent);
    setLastPaymentOutcome(JSON.stringify(newEvent.payment_event, null, 2));
    setPendingPayment(null);
  }, [pendingPayment]);

  React.useEffect(() => {
    Boxo.setConfig('352131', {
      sandboxMode: false,
      isDebug: true,
      showClearCache: false,
      showAboutPage: false,
      showPermissionsPage: false,
    });

    const customEventsSubscription = Boxo.customEvents.subscribe(event => {
      console.log(event.app_id, ' custom event: ', event);
      const newEvent = {
        app_id: event.app_id,
        custom_event: {
          payload: { payment: 'received' },
          request_id: event.custom_event.request_id,
          type: event.custom_event.type,
        },
      };
      Boxo.customEvents.send(newEvent);
    });

    const paymentEventsSubscription = Boxo.paymentEvents.subscribe(event => {
      console.log(event.app_id, ' payment event: ', event);
      Boxo.hideMiniapps();
      setLastPaymentOutcome(null);
      setPendingPayment(event);
      setTab('payment');
    });

    const lifecycleEventsSubscription = Boxo.lifecycleHooksListener({
      onLaunch: (appId: string) => console.log(appId, 'onLaunch'),
      onResume: (appId: string) => console.log(appId, 'onResume'),
      onClose: (appId: string) => console.log(appId, 'onClose'),
      onPause: (appId: string) => console.log(appId, 'onPause'),
      onAuth: async (appId: string) => {
        console.log(appId, 'onAuth');
        try {
          const res = await fetch(
            'https://demo-hostapp.appboxo.com/api/get_auth_code/',
          );
          const data = await res.json();
          Boxo.setAuthCode(appId, data.auth_code);
        } catch (e) {
          console.error(e);
          Boxo.setAuthCode(appId, '');
        }
      },
      onError: (appId: string, error: string) =>
        console.log(appId, 'onError', error),
      onUserInteraction: (appId: string) =>
        console.log(appId, 'onUserInteraction'),
    });

    return () => {
      lifecycleEventsSubscription();
      customEventsSubscription();
      paymentEventsSubscription();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <View style={styles.body}>
          {tab === 'home' && <HomeTab />}
          {tab === 'explore' && (
            <ExploreTab onGoToPayment={() => setTab('payment')} />
          )}
          {tab === 'payment' && (
            <PaymentTab
              pendingPayment={pendingPayment}
              lastPaymentOutcome={lastPaymentOutcome}
              onConfirmPay={handleConfirmPay}
            />
          )}
        </View>
        <BottomTabBar active={tab} onChange={setTab} />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
  },
});

export default App;
