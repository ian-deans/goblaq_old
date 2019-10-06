const path = require( "path" )
require("dotenv").config()

module.exports = {
  webpack( config, options ) {
    config.resolve.alias[ "~/components" ] = path.join( __dirname, "components" )
    config.resolve.alias[ "~/services" ] = path.join( __dirname, "services" )
    return config
  }
}