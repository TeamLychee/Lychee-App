// apiEndpoints.ts
const API_ENDPOINTS = {
    baseURL: 'http://54.180.100.242:3000',

    //auth
    signUp: '/signup',
    login: '/login',
    logout: '/user', //'/user/:userId'

    //user
    profile: '/user/mypage', ///user/mypage/:userId
    matesAll: '/user/all', ///user/all/:userId
    my: '/user/setting', ///user/setting/:userId

    //post
    posts: '/feed',
    /*  addPost: '/feed',
        updatePost: '/feed', ///feed/:feedId
        deletePost: '/feed', ///feed/:feedId */
    postPin: '/feed/pin/', ///feed/pin/:feedId

    //budgets
   // budgets: '/budget',
    
};

export default API_ENDPOINTS;

  