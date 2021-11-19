import * as yup from 'yup';


    export let schema = yup.object().shape({
        fullName: yup.string().required('Full name is required.'),
        email: yup.string().email().required('Email is required.'),
        phone: yup.string().required("Contact number is required."),
        wechat: yup.string().nullable(),
        password: yup.string().min(8).required('Password must be minimum 8 characters.'),
        passwordConfirmation: yup.string().required(),
        // appointment: yup.string().required(),
        // nationality: yup.string().nullable(),
        // referral: yup.string().nullable(),
        agreedTerms: yup.boolean().required()
        .oneOf([true], 'Privacy policy box must be checked.'),
    })
