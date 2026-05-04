export type TabRoute = 'home' | 'explore' | 'payment';

export const TAB_ORDER: TabRoute[] = ['home', 'explore', 'payment'];

export const TAB_LABELS: Record<TabRoute, string> = {
  home: 'Home',
  explore: 'Explore',
  payment: 'Payment',
};
