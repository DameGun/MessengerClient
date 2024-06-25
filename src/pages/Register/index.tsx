import {
  Container,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  FormErrorMessage,
  Button,
  Link as ChakraUiLink,
  Text,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react';
import { Register } from '@customTypes/authentication';
import { isFetchBaseQueryError } from '@helpers/reduxUtils';
import { useAppDispatch } from '@hooks/redux';
import { useRegisterMutation } from '@services/redux/auth/authApiSlice';
import { setCredentials } from '@services/redux/auth/authSlice';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, Link as ReactRouterLink } from 'react-router-dom';
import * as yup from 'yup';

export default function RegisterPage() {
  const [register] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const [loginResponseError, setLoginResponseError] = useState('');

  const initialValues: Register = {
    email: '',
    password: '',
  };

  const RegisterSchema = yup.object({
    email: yup.string().trim().email('Invalid email format').required('Email is required'),
    password: yup
      .string()
      .trim()
      .length(8, 'Password must be exactly 8 characters')
      .required('Password required'),
  });

  const handleSubmit = async (values: Register, { setSubmitting }: FormikHelpers<Register>) => {
    try {
      const tokens = await register(values).unwrap();
      dispatch(setCredentials({ ...tokens }));
      navigate('/', { replace: true });
    } catch (err) {
      console.log(err);
      if (isFetchBaseQueryError(err)) {
        if (err.status === 400) {
          setLoginResponseError('Missing email or password');
        } else if (err.status === 422) {
          setLoginResponseError('Invalid credentials');
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
        <Heading mb={10}>Register</Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
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
                Already have an account?{' '}
                <ChakraUiLink color='teal.500' as={ReactRouterLink} to='/login' replace>
                  Click here to login
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
                Sign Up
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
