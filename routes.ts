/**
 * Array of routes that do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/listings",

]
/**
 * Array of routes that require authentication
 * These routes will redirect users to /dashboard
 * @type {string[]}
 */


export const authRoutes = [
    "/login",
    "/signup",
    "/error"
]

/**
 * The prefix for api authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";



/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"