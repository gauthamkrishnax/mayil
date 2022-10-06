import gsap from "gsap";

export function addParallax(element, trigger, effect) {
	let tl1 = gsap.timeline({
		scrollTrigger: {
			trigger: trigger,
			start: "top 95%",
			end: "top 5%",
			scrub: 2,
			// markers: true,
			scroller: ".container",
		},
	});
	tl1.to(element, {
		...effect,
	});
}

export function addScrollAnimation(element, trigger, effect) {
	let tl2 = gsap.timeline({
		scrollTrigger: {
			trigger: trigger,
			start: "top 95%",
			end: "top 5%",
			// markers: true,
			scroller: ".container",
		},
	});
	tl2.from(element, {
		...effect,
	});
}
