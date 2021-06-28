export const checkIsAdmin = currentUser => {
    if( !currentUser || !Array.isArray(currentUser.userRoles)) return false;

    //destrcuture userRoles
    // const {userRoles} = currentUser;

    // if(userRoles.includes('admin')) {
    //     console.log("it is included")
    //     return true;
    // }else{
    //     console.log("in false ")
    //     return false;

    // }
    const {userRoles} = currentUser
    console.log(userRoles)
    if(userRoles.includes('admin')) {
        console.log("it is included")
        return true;
    }else{
        console.log("in false ")
        return false;

    }

}