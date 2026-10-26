import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      expect(repositoryItems).toHaveLength(2);

      // First repository
      expect(screen.getByText('jaredpalmer/formik')).toBeTruthy();
      expect(
        screen.getByText('Build forms in React, without the tears')
      ).toBeTruthy();
      expect(screen.getByText('TypeScript')).toBeTruthy();
      expect(screen.getByText('21.9k')).toBeTruthy();
      expect(screen.getByText('1.6k')).toBeTruthy();
      expect(screen.getByText('88')).toBeTruthy();

      // Second repository
      expect(screen.getByText('async-library/react-async')).toBeTruthy();
      expect(
        screen.getByText('Flexible promise-based React data loader')
      ).toBeTruthy();
      expect(screen.getByText('JavaScript')).toBeTruthy();
      expect(screen.getByText('1.8k')).toBeTruthy();
      expect(screen.getByText('69')).toBeTruthy();
      expect(screen.getByText('72')).toBeTruthy();
    });
  });
});
