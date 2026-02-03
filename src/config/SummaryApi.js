const REACT_APP_BACKEND_URL = import.meta.env.REACT_APP_BACKEND_URL;

const SummaryApi = {
    signUP: {
        url: `${REACT_APP_BACKEND_URL}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${REACT_APP_BACKEND_URL}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${REACT_APP_BACKEND_URL}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${REACT_APP_BACKEND_URL}/api/userLogout`,
        method: 'get'
    },
    allUser: {
        url: `${REACT_APP_BACKEND_URL}/api/all-user`,
        method: 'get'
    },
    updateUser: {
        url: `${REACT_APP_BACKEND_URL}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${REACT_APP_BACKEND_URL}/api/upload-product`,
        method: 'post'
    },
    allProduct: {
        url: `${REACT_APP_BACKEND_URL}/api/get-product`,
        method: 'get'
    },
    updateProduct: {
        url: `${REACT_APP_BACKEND_URL}/api/update-product`,
        method: 'post'
    },
    categoryProduct: {
        url: `${REACT_APP_BACKEND_URL}/api/get-categoryProduct`,
        method: 'get'
    },
    categoryWiseProduct: {
        url: `${REACT_APP_BACKEND_URL}/api/category-product`,
        method: 'post'
    },
    productDetails: {
        url: `${REACT_APP_BACKEND_URL}/api/product-details`,
        method: 'post'
    },
    addToCartProduct: {
        url: `${REACT_APP_BACKEND_URL}/api/addtocart`,
        method: 'post'
    },
    addToCartProductCount: {
        url: `${REACT_APP_BACKEND_URL}/api/countAddToCartProduct`,
        method: 'get'
    },
    addToCartProductView: {
        url: `${REACT_APP_BACKEND_URL}/api/view-card-product`,
        method: 'get'
    },
    updateCartProduct: {
        url: `${REACT_APP_BACKEND_URL}/api/update-cart-product`,
        method: 'post'
    },
    deleteCartProduct: {
        url: `${REACT_APP_BACKEND_URL}/api/delete-cart-product`,
        method: 'post'
    },
    searchProduct: {
        url: `${REACT_APP_BACKEND_URL}/api/search`,
        method: 'get'
    },
    filterProduct: {
        url: `${REACT_APP_BACKEND_URL}/api/filter-product`,
        method: 'post'
    },
    forgetPassword: {
        url: `${REACT_APP_BACKEND_URL}/api/forgot-password`,
        method: 'post'
    },
    resetPassword: {
        url: `${REACT_APP_BACKEND_URL}/api/reset-password`,
        method: 'post'
    },
    payment: {
        url: `${REACT_APP_BACKEND_URL}/api/checkout`,
        method: 'post'
    },
    getOrder: {
        url: `${REACT_APP_BACKEND_URL}/api/order-list`,
        method: 'get'
    },
    allOrder: {
        url: `${REACT_APP_BACKEND_URL}/api/all-order`,
        method: 'get'
    },
}

export default SummaryApi;