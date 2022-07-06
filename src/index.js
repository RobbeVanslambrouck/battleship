import { Header, Main, Footer } from "./commentElements";

const homepageHeader = Header("battleship", "#").getElement();
const homepageFooter = Footer().getElement();
const homepagecontent = Main().getElement();
document.body.append(homepageHeader, homepagecontent, homepageFooter);

const Ship = () => {};
const Gameboard = () => {};
const Player = () => {};

const game = (() => {})();
