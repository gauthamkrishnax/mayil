import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

class GScroll {
	constructor(elmt, speed, onUpdate = () => true) {
		this.speed = speed / 10 || 0.06;
		this.elmt = elmt;
		this.isWheeling = null;
		this.deltaY = 0;
		this.update = onUpdate;
	}

	init() {
		this.current = this.scrollTop = 0;

		this.height =
			document.querySelector(this.elmt).clientHeight - window.innerHeight;
		this.deplacement = gsap.quickSetter(this.elmt, "y", "px");

		this.addTicker = () => {
			this.playTicker();
		};
		gsap.ticker.add(this.addTicker);
	}

	wheel() {
		window.addEventListener(
			"wheel",
			(this.ref = (e) => {
				this.deltaY = e.deltaY;
				window.clearTimeout(this.isWheeling);
				this.isWheeling = setTimeout((e) => {
					this.deltaY = 0;
				}, 66);
			})
		);
	}

	unwheel() {
		window.removeEventListener("wheel", this.ref);
	}

	resize() {
		this.height =
			document.querySelector(this.elmt).clientHeight - window.innerHeight;
	}

	scrollTo(section, dur) {
		const duration = dur || 1;
		gsap.to(this, {
			scrollTop:
				document.querySelector(section).getBoundingClientRect().top -
				this.current,
			duration,
			ease: "power3.inOut",
		});
	}

	playTicker() {
		const dt = 1.0 - Math.pow(1.0 - this.speed, gsap.ticker.deltaRatio());

		if (this.scrollTop + this.deltaY > this.height) {
			this.scrollTop = this.height;
		} else if (this.scrollTop + this.deltaY < 0) {
			this.scrollTop = 0;
		} else if (this.deltaY !== 0) {
			this.scrollTop += this.deltaY;
		}

		const diff = -this.scrollTop - this.current;
		if (Math.round(100 * diff) / 100 != 0) {
			this.current += diff * dt;
			this.deplacement(this.current);
		}

		this.update();
	}

	destroy() {
		gsap.killTweensOf(this.elmt);
		window.removeEventListener("wheel", this.ref);
		gsap.ticker.remove(this.addTicker);
	}
}

gsap.registerPlugin(ScrollTrigger);

const scroll = new GScroll("#GScroll", 0.6, () => {
	ScrollTrigger.update();
});

scroll.init();
scroll.wheel();

const scroller = document.getElementById("GScroll");
ScrollTrigger.defaults({
	scroller: scroller,
});

ScrollTrigger.scrollerProxy(scroller, {
	scrollTop(value) {
		if (arguments.length) {
			scroll.current = -value; // setter
		}
		return -scroll.current; // getter
	},
	getBoundingClientRect() {
		return {
			top: 0,
			left: 0,
			width: window.innerWidth,
			height: window.innerHeight,
		};
	},
});

window.addEventListener("resize", () => {
	scroll.resize();
});

// Add GSAP Animations
scroll.resize();
