/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
const withLess = require("next-with-less");
/** @type {import('next').NextConfig} */
module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        "@primary-color": "#EC1C2A",
      },
    },
  },
  compiler: {
    styledComponents: true,
  },
});
