// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'amrutya-9a892',
    appId: '1:900052512777:web:c69e62f4f9bbf70c5608d8',
    storageBucket: 'amrutya-9a892.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyDJ4OORInU0_fsPWkcC1Rmu0EtzkpiX6us',
    authDomain: 'amrutya-9a892.firebaseapp.com',
    messagingSenderId: '900052512777',
  },
  APIs: {
    registerUser:"https://practice4407.herokuapp.com/User/register",
    loginUser: "https://practice4407.herokuapp.com/User/login",
    getAllManagers:"https://practice4407.herokuapp.com/User/get_all_manager",
    fileUpload: "https://practice4407.herokuapp.com/file/fill_info",
    getFile: "https://practice4407.herokuapp.com/file/get_by_user_id/",
    getFileManager: "https://practice4407.herokuapp.com/file/get_pending_manger_id/",
    approve: "https://practice4407.herokuapp.com/file/approve/",
    deny: "https://practice4407.herokuapp.com/file/deny/",
    getAllUsers: "https://practice4407.herokuapp.com/User/get_all_users",
    share: "https://practice4407.herokuapp.com/shared_file/fill_shared_file",
    getShared: "https://practice4407.herokuapp.com/shared_file/get_by_user_id/",
    getSingleFile: "https://practice4407.herokuapp.com/file/get/",
    getManagerApproved: "https://practice4407.herokuapp.com/file/get_approved_manger_id/",
    getManagerDenied: "https://practice4407.herokuapp.com/file/get_denied_manger_id/"
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
