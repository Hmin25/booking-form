import * as yup from 'yup';


    export let schemaOtp = yup.object().shape({
        otp: yup.string().required()
    })
