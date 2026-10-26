import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tabText: {
    fontWeight: '700',
  },
});

const AppBarTab = ({ title, to, onPress }) => {
  if (to) {
    return (
      <Link to={to} component={Pressable} style={styles.tab}>
        <Text color="white" fontSize="subheading" style={styles.tabText}>
          {title}
        </Text>
      </Link>
    );
  }

  return (
    <Pressable onPress={onPress} style={styles.tab}>
      <Text color="white" fontSize="subheading" style={styles.tabText}>
        {title}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
