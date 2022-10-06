import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { addParallax, addScrollAnimation } from "./utils.js";

gsap.registerPlugin(ScrollTrigger);

const scroller = new LocomotiveScroll({
	el: document.querySelector(".container"),
	smooth: true,
});

scroller.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".container", {
	scrollTop(value) {
		return arguments.length
			? scroller.scrollTo(value, 0, 0)
			: scroller.scroll.instance.scroll.y;
	},
	getBoundingClientRect() {
		return {
			left: 0,
			top: 0,
			width: window.innerWidth,
			height: window.innerHeight,
		};
	},
});

// Add animations here

addParallax(".hrline", ".co2", { width: 10, opacity: 0 });
addParallax(".main-title", ".co2", { y: 200, opacity: 0.5 });
addScrollAnimation(".sub-title-co2", ".sub-title-co2", {
	opacity: 0,
	y: 100,
	duration: 2,
});

addScrollAnimation(".sub-title-co3", ".sub-title-co3", {
	opacity: 0,
	y: 100,
	duration: 2,
});
addScrollAnimation(".sub-title-co4", ".sub-title-co4", {
	opacity: 0,
	y: 100,
	duration: 2,
});
addScrollAnimation(".sub-title-co5", ".sub-title-co5", {
	opacity: 0,
	y: 100,
	duration: 2,
});
ScrollTrigger.addEventListener("refresh", () => scroller.update());
ScrollTrigger.refresh();
