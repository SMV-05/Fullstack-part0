import React from 'react';
import { View, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { format } from 'date-fns';
import Text from './Text';
import { ME } from '../graphql/queries';
import useDeleteReview from '../hooks/useDeleteReview';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.mainBackground,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
  },
  reviewRow: {
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
  content: {
    flex: 1,
  },
  repoName: {
    marginBottom: 4,
  },
  date: {
    marginBottom: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    flex: 1,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    flex: 1,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginLeft: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const formattedDate = review.createdAt
    ? format(new Date(review.createdAt), 'dd.MM.yyyy')
    : '';

  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteReview(review.id);
            refetch();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.reviewRow}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.content}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.repoName}>
            {review.repository?.fullName}
          </Text>
          <Text color="textSecondary" style={styles.date}>
            {formattedDate}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>

      <View style={styles.buttonsRow}>
        <Pressable
          style={styles.viewButton}
          onPress={() => navigate(`/repository/${review.repository?.id}`)}
        >
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const UserReviews = () => {
  const { data, refetch, fetchMore, loading } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const reviews = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.me?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        includeReviews: true,
      },
    });
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <UserReviewItem review={item} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default UserReviews;
