import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import AppBarTab from './AppBarTab';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight || 20,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
  },
  scrollView: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  const currentUser = data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab title="Repositories" to="/" />
        {currentUser ? (
          <>
            <AppBarTab title="Create a review" to="/create-review" />
            <AppBarTab title="My reviews" to="/my-reviews" />
            <AppBarTab title="Sign out" onPress={handleSignOut} />
          </>
        ) : (
          <>
            <AppBarTab title="Sign in" to="/signin" />
            <AppBarTab title="Sign up" to="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
