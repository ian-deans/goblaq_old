/*
  This file saves us from having to import and set up the enzyme
  adapter at the top of each test file.
*/
const Adapter = require("enzyme-adapter-react-16");

require("enzyme").configure({adapter: new Adapter() })