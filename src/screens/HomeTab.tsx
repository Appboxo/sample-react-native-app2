import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Boxo from '@appboxo/react-native-sdk';

export function HomeTab() {
  const openMiniapp = () => {
    Boxo.openMiniapp('app16973', {
      pageAnimation: 'RIGHT_TO_LEFT',
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Home</Text>
      <Text style={styles.body}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
        Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies
        sed, dolor.
      </Text>
      <View style={styles.buttonWrap}>
        <Button title="Open miniapp" onPress={openMiniapp} />
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
    marginBottom: 24,
  },
  buttonWrap: {
    alignSelf: 'center',
    minWidth: 200,
  },
});
