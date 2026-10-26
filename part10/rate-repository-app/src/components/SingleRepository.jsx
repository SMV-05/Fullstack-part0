import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import useRepository from '../hooks/useRepository';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.mainBackground,
  },
  reviewContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    marginBottom: 4,
  },
  date: {
    marginBottom: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewItem = ({ review }) => {
  const formattedDate = review.createdAt
    ? format(new Date(review.createdAt), 'dd.MM.yyyy')
    : '';

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text fontWeight="bold" style={styles.username}>
          {review.user?.username}
        </Text>
        <Text color="textSecondary" style={styles.date}>
          {formattedDate}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({
    id,
    first: 10,
  });

  if (!repository) return null;

  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <View style={{ marginBottom: 10 }}>
          <RepositoryItem item={repository} showGitHubButton={true} />
        </View>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
