import { useEffect, useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link as ChakraUiLink,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Login } from '@customTypes/authentication';
import { isFetchBaseQueryError } from '@helpers/reduxUtils';
import { useAppDispatch } from '@hooks/redux';
import { useLoginMutation } from '@services/redux/auth/authApiSlice';
import { setCredentials } from '@services/redux/auth/authSlice';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { LoginSchema } from './validation';

export default function LoginPage() {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const [loginResponseError, setLoginResponseError] = useState('');

  const initialValues: Login = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: Login, { setSubmitting }: FormikHelpers<Login>) => {
    try {
      const tokens = await login(values).unwrap();
      dispatch(setCredentials(tokens));
      navigate('/', { replace: true });
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        if (err.status === 400) {
          setLoginResponseError('Missing email or password');
        } else if (err.status === 422) {
          setLoginResponseError('Invalid credentials');
        } else if (err.status === 401) {
          setLoginResponseError('Login failed');
        } else {
          setLoginResponseError('Server error');
        }
      } else {
        setLoginResponseError('No server response');
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (loginResponseError) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginResponseError]);

  function closeAlert() {
    onClose();
    setLoginResponseError('');
  }

  return (
    <Container h='100vh' centerContent>
      <Box mt={200} p={20} display='flex' flexDirection='column' alignItems='center'>
        <Heading mb={10}>Login</Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, errors, touched }) => (
            <Form style={{ width: 300 }}>
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel>Email</FormLabel>
                <Field id='email' name='email' as={Input} type='text' />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl mt={5} isInvalid={!!errors.password && touched.password}>
                <FormLabel>Password</FormLabel>
                <Field id='password' name='password' as={Input} type='password' />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Text fontSize={14} mt={2}>
                Dont&apos;t have an account?{' '}
                <ChakraUiLink color='teal.500' as={ReactRouterLink} to='/register' replace>
                  Click here to sign up
                </ChakraUiLink>
              </Text>
              <Button
                mt={4}
                width='100%'
                bgColor='blue.200'
                type='submit'
                isDisabled={!isValid}
                isLoading={isSubmitting}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      {isVisible && (
        <Alert status='error' justifyContent='space-between'>
          <Box display='flex' flexDirection='row' alignItems='center'>
            <AlertIcon />
            <AlertTitle>{loginResponseError}</AlertTitle>
          </Box>
          <CloseButton
            alignSelf='flex-start'
            position='relative'
            right={-1}
            top={-1}
            onClick={closeAlert}
          />
        </Alert>
      )}
    </Container>
  );
}
