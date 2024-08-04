export const baseUrl = "http://10.0.2.2:4000";


export const URLs = {
    register : `${baseUrl}/v1/users/register/`,
    authenticate : `${baseUrl}/v1/users/authentication`,
    getUserDetilas : `${baseUrl}/v1/users/getDetails`,
    user: {
        updateProfilePic : `${baseUrl}/v1/users/updateProfilePic/`,
        update: `${baseUrl}/v1/users/update/`
    },
    media: {
        profile : `${baseUrl}/media/user-profile/`
    },
    listing: {
        uploadImage: `${baseUrl}/v1/gallery`
    }
}