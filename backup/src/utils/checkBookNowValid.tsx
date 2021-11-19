import * as yup from 'yup';


    export let schemaBookNow = yup.object().shape({
        fullName: yup.string().required('Full name is required.'),
        email: yup.string().email().required('Email is required.'),
        phone: yup.string().required("Contact number is required."),
        agreedInfoCollect: yup.boolean().required()
        .oneOf([true], 'Information collect box must be checked.'),
        agreedTerms: yup.boolean().required()
        .oneOf([true], 'Privacy policy box must be checked.'),
    })
