require( "dotenv" ).config()
const path = require( "path" )
const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  webpack( config, {isServer} ) {
    config.resolve.extensions.push(".ts", ".tsx")
    config.resolve.alias[ "~/components" ] = path.join( __dirname, "src", "components" )
    config.resolve.alias[ "~/contexts" ] = path.join( __dirname, "src", "contexts" )
    config.resolve.alias[ "~/services" ] = path.join( __dirname, "services" )
    config.resolve.alias[ "~/config" ] = path.join( __dirname, "config" )
    config.resolve.alias[ "~/common" ] = path.join( __dirname, "common" )
    return config
  },
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET_URL: process.env.FIREBASE_STORAGE_BUCKET_URL,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  }
})