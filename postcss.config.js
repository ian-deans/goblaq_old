// module.exports = (ctx) => {
//   const plugins = {
//     autoprefixer: {
//       ...ctx.options.autoprefixer,
//       browsers: [
//         '>1%',
//         'last 4 versions',
//         'Firefox ESR',
//         'not ie < 9',
//       ],
//       flexbox: 'no-2009',
//     }
//   }
//   plugins['postcss-nested'] = {};
//   return { plugins };
// };

module.exports = {
  plugins: [
    require("autoprefixer")
  ]
}