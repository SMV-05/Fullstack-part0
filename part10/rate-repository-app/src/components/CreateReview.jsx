import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import TextInput from './TextInput';
import Text from './Text';
import useCreateReview from '../hooks/useCreateReview';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 15,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorMessage: {
    color: theme.colors.error,
    marginBottom: 10,
    marginTop: -5,
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner username is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup.string().optional(),
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const data = await createReview({
        ownerName,
        repositoryName,
        rating,
        text,
      });

      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            placeholder="Repository owner name"
            value={values.ownerName}
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
            error={touched.ownerName && Boolean(errors.ownerName)}
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.errorMessage}>{errors.ownerName}</Text>
          )}

          <TextInput
            placeholder="Repository name"
            value={values.repositoryName}
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            error={touched.repositoryName && Boolean(errors.repositoryName)}
          />
          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.errorMessage}>{errors.repositoryName}</Text>
          )}

          <TextInput
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
            value={values.rating}
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            error={touched.rating && Boolean(errors.rating)}
          />
          {touched.rating && errors.rating && (
            <Text style={styles.errorMessage}>{errors.rating}</Text>
          )}

          <TextInput
            placeholder="Review"
            multiline
            value={values.text}
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            error={touched.text && Boolean(errors.text)}
          />
          {touched.text && errors.text && (
            <Text style={styles.errorMessage}>{errors.text}</Text>
          )}

          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default CreateReview;
