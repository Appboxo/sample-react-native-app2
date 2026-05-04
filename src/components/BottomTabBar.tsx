import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { TabRoute } from '../navigation/tabRoutes';
import { TAB_LABELS, TAB_ORDER } from '../navigation/tabRoutes';

type Props = {
  active: TabRoute;
  onChange: (route: TabRoute) => void;
};

export function BottomTabBar({ active, onChange }: Props) {
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, Platform.OS === 'ios' ? 8 : 6);

  return (
    <View style={[styles.wrap, { paddingBottom: bottomPad }]}>
      <View style={styles.row}>
        {TAB_ORDER.map(route => {
          const selected = active === route;
          return (
            <Pressable
              key={route}
              style={({ pressed }) => [
                styles.tab,
                selected && styles.tabSelected,
                pressed && styles.tabPressed,
              ]}
              onPress={() => onChange(route)}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              accessibilityLabel={TAB_LABELS[route]}>
              <Text
                style={[styles.label, selected && styles.labelSelected]}
                numberOfLines={1}>
                {TAB_LABELS[route]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    backgroundColor: '#f8f8f8',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabSelected: {
    backgroundColor: '#e8eefc',
  },
  tabPressed: {
    opacity: 0.85,
  },
  label: {
    fontSize: 13,
    color: '#555',
  },
  labelSelected: {
    color: '#1d4ed8',
    fontWeight: '600',
  },
});
