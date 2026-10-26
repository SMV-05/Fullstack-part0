import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import TextInput from './TextInput';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.mainBackground,
  },
  headerContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    marginBottom: 10,
  },
  picker: {
    backgroundColor: '#f8f9fa',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListHeader = ({
  selectedOrder,
  setSelectedOrder,
  searchKeyword,
  setSearchKeyword,
}) => (
  <View style={styles.headerContainer}>
    <TextInput
      placeholder="Search repositories..."
      value={searchKeyword}
      onChangeText={setSearchKeyword}
      style={styles.searchInput}
    />
    <Picker
      selectedValue={selectedOrder}
      onValueChange={(itemValue) => setSelectedOrder(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="Latest repositories" value="LATEST" />
      <Picker.Item label="Highest rated repositories" value="HIGHEST_RATED" />
      <Picker.Item label="Lowest rated repositories" value="LOWEST_RATED" />
    </Picker>
  </View>
);

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { selectedOrder, setSelectedOrder, searchKeyword, setSearchKeyword } =
      this.props;
    if (!setSelectedOrder) return null;
    return (
      <RepositoryListHeader
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    );
  };

  render() {
    const { repositories, onEndReach, navigate } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate && navigate(`/repository/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('LATEST');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearch] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();

  let orderBy = 'CREATED_AT';
  let orderDirection = 'DESC';

  if (selectedOrder === 'HIGHEST_RATED') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'DESC';
  } else if (selectedOrder === 'LOWEST_RATED') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'ASC';
  }

  const { repositories, fetchMore } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearch,
    first: 8,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      navigate={navigate}
    />
  );
};

export default RepositoryList;
