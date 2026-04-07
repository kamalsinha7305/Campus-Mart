import { LogOut } from "lucide-react";

export const baseURL = "http://localhost:5000"; 

const SummaryApi = { 
    register: {
        url: '/api/auth/register',
        method: 'post'
    },
    login: {
        url: '/api/auth/login', 
        method: 'post'
    },
    forgot_password: {
        url: '/api/auth/forgot-password', 
        method: 'put'
    },
    otpVerification: {
        url: '/api/auth/verify-forgot-password-otp', 
        method: 'put'
    },
    userProfile:{
        url: '/api/user/userProfile',
        method: 'get'
    },
    deleteAccount: {
        url: '/api/user/deleteAccount',
        method: 'delete'
    },
    logoutUser:{
        url: '/api/auth/logoutUser',
        method: 'get'
    }
};

export default SummaryApi;