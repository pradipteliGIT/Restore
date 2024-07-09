import * as yup from 'yup';

export const validationSchema = [
  yup.object({
    fullName: yup.string().required('Full name required'),
    address1: yup.string().required('Address line 1 required'),
    address2: yup.string().required('addressLine 2 required'),
    state: yup.string().required('State required'),
    city: yup.string().required('City required'),
    country: yup.string().required('Country required'),
    zip: yup.string().required('Zip code required'),
  }),
  yup.object(),
  yup.object({
    nameOnCard: yup.string().required('Name on card required'),
  }),
];
