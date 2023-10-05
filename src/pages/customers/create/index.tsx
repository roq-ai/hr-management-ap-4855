import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createCustomer } from 'apiSdk/customers';
import { customerValidationSchema } from 'validationSchema/customers';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { CustomerInterface } from 'interfaces/customer';

function CustomerCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CustomerInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCustomer(values);
      resetForm();
      router.push('/customers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CustomerInterface>({
    initialValues: {
      purchase_history: '',
      total_spent: 0,
      last_purchase_date: new Date(new Date().toDateString()),
      favorite_product: '',
      membership_level: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: customerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Customers',
              link: '/customers',
            },
            {
              label: 'Create Customer',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Customer
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.purchase_history}
            label={'Purchase History'}
            props={{
              name: 'purchase_history',
              placeholder: 'Purchase History',
              value: formik.values?.purchase_history,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Total Spent"
            formControlProps={{
              id: 'total_spent',
              isInvalid: !!formik.errors?.total_spent,
            }}
            name="total_spent"
            error={formik.errors?.total_spent}
            value={formik.values?.total_spent}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_spent', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="last_purchase_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Last Purchase Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.last_purchase_date ? new Date(formik.values?.last_purchase_date) : null}
              onChange={(value: Date) => formik.setFieldValue('last_purchase_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.favorite_product}
            label={'Favorite Product'}
            props={{
              name: 'favorite_product',
              placeholder: 'Favorite Product',
              value: formik.values?.favorite_product,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.membership_level}
            label={'Membership Level'}
            props={{
              name: 'membership_level',
              placeholder: 'Membership Level',
              value: formik.values?.membership_level,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/customers')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'customer',
    operation: AccessOperationEnum.CREATE,
  }),
)(CustomerCreatePage);
