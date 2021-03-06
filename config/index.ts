// This file is for general purpose configuration values. ex: current envrironment
type SocialMediaURLs = {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
};

export const socialMediaURLs: SocialMediaURLs = {
  facebook: "https://www.facebook.com/goblaqapp/",
  twitter: "https://twitter.com/goblaqapp",
  instagram: "https://instagram.com/goblaqapp",
  linkedin: "https://linkedin.com/company/goblaq",
};

export const inProduction = process.env.NODE_ENV === "production";

type NavbarLinks = {
  Home: string;
  Explore: string;
  Login?: string;
};
export const navbarLinks: NavbarLinks = {
  Home: "/",
  Explore: "/explore",

};

const graphqlProductionURL = process.env.GRAPHQL_PRODUCTION_URL;
const graphqlDevURL = process.env.DEV_DB;

export const graphqlURL = inProduction ? graphqlProductionURL : graphqlDevURL
