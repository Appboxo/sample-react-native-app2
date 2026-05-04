import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

type Props = {
  onGoToPayment: () => void;
};

export function ExploreTab({ onGoToPayment }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.body}>
        Integer lacinia. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
        Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
      </Text>
      <View style={styles.actions}>
        <Button title="Go to payment" onPress={onGoToPayment} />
      </View>
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
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    marginBottom: 20,
  },
  actions: {
    alignSelf: 'center',
    minWidth: 220,
  },
});
