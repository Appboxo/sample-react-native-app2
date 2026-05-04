import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  View,
} from 'react-native';
import type { BoxoPaymentEvent } from '@appboxo/react-native-sdk';

type Props = {
  pendingPayment: BoxoPaymentEvent | null;
  lastPaymentOutcome: string | null;
  onConfirmPay: () => void;
};

export function PaymentTab({
  pendingPayment,
  lastPaymentOutcome,
  onConfirmPay,
}: Props) {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.placeholder}>
        Payment will be processed on this screen when you start checkout from the
        miniapp.
      </Text>

      {pendingPayment != null && (
        <View style={styles.pendingBlock}>
          <Text style={styles.sectionTitle}>Checkout in progress</Text>
          <Text style={styles.meta}>
            App: {pendingPayment.app_id}
            {'\n'}
            Order: {pendingPayment.payment_event.miniapp_order_id}
            {'\n'}
            Amount: {pendingPayment.payment_event.amount}{' '}
            {pendingPayment.payment_event.currency}
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.payButton,
              pressed && styles.payButtonPressed,
            ]}
            onPress={onConfirmPay}
            accessibilityRole="button"
            accessibilityLabel="Confirm payment">
            <Text style={styles.payLabel}>Pay</Text>
          </Pressable>
        </View>
      )}

      {lastPaymentOutcome != null && (
        <View style={styles.outcomeBlock}>
          <Text style={styles.sectionTitle}>Payment event result</Text>
          <Text style={styles.outcomeText} selectable>
            {lastPaymentOutcome}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  placeholder: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginBottom: 20,
  },
  pendingBlock: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111',
  },
  meta: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 16,
  },
  payButton: {
    alignSelf: 'stretch',
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonPressed: {
    opacity: 0.88,
  },
  payLabel: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  outcomeBlock: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f0f4f8',
    borderRadius: 8,
  },
  outcomeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
    color: '#1a1a1a',
  },
});
