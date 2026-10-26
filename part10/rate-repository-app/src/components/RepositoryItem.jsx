import React from 'react';
import { View, Image, StyleSheet, Pressable, Linking } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { formatCount } from '../utils/formatters';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardBackground,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  fullName: {
    marginBottom: 4,
  },
  description: {
    marginBottom: 8,
  },
  languageBadge: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  languageText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    marginBottom: 4,
  },
  githubButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 15,
  },
  githubButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

const RepositoryItem = ({ item, showGitHubButton = false }) => {
  if (!item) return null;

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.fullName}>
            {item.fullName}
          </Text>
          <Text color="textSecondary" style={styles.description}>
            {item.description}
          </Text>
          <View style={styles.languageBadge}>
            <Text style={styles.languageText}>{item.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text fontWeight="bold" style={styles.statValue}>
            {formatCount(item.stargazersCount)}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold" style={styles.statValue}>
            {formatCount(item.forksCount)}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold" style={styles.statValue}>
            {formatCount(item.reviewCount)}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold" style={styles.statValue}>
            {item.ratingAverage}
          </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>

      {showGitHubButton && item.url && (
        <Pressable
          style={styles.githubButton}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={styles.githubButtonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
