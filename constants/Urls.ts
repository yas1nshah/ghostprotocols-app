
// export const baseUrl = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
//   ? manifest.debuggerHost.split(`:`).shift().concat(`:4000`)
//   : `http://10.0.2.2:4000"`;;
export const baseUrl = 'http://192.168.1.9:4000'

export const URLs = {
    register : `${baseUrl}/v1/users/register`,
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
        post: `${baseUrl}/v1/listings`,
        uploadImage: `${baseUrl}/v1/gallery`,
        home: `${baseUrl}/v1/listings/home`,
        image: `${baseUrl}/media/listings/`,
        view: `${baseUrl}/v1/listings/`,
        
    }
}