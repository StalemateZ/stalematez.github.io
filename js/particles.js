function getRange(min, max) {
	return max - min;
}

const xCoordRange = { min: 100, max: window.innerWidth - 100};
const yCoordRange = { min: 100, max: window.innerHeight - 100};
const sizeRange = { min: 1, max: 5};
const glowSizeOffset = 3;

const maxLifespanRange = { min: 500, max: 1500};
const speedRange = { min: 1, max: 2};
const transitionMultiplier = 1;
const moveInOneDirectionRange = { min: 5, max: 6};
const fadePercentage = 0.25;

let currentParticles = 0;
const spawnDelayRange = { min: 25, max: 125};
let spawnDelay = Math.random() * getRange(spawnDelayRange.min, spawnDelayRange.max) + spawnDelayRange.min;
let currentSpawnDelayValue = 0;

const particles = document.getElementsByClassName("particle");
const homePageDiv = document.getElementsByClassName("home-page")[0];

function getInactiveParticle() {
	for (const particle of particles) {
		if (parseFloat(particle.style.opacity) <= 0) return particle;
	}
	return null;
}

// https://stackoverflow.com/a/55840787
// https://stackoverflow.com/a/387733

function ParticleMovement(particle) {
	this.particle = particle;
	this.lifespan = 0;
	this.maxLifespan = Math.random() * getRange(maxLifespanRange.min, maxLifespanRange.max) + maxLifespanRange.min;
	this.fadeInValue = this.maxLifespan * fadePercentage;
	this.fadeOutValue = this.maxLifespan - this.fadeInValue;
	this.movementRange1 = 0;
	this.movementRangeMax1 = 0;
	this.previousDirection1 = 0;
	this.movementRange2 = 0;
	this.movementRangeMax2 = 0;
	this.previousDirection2 = 0;
	this.main = this.main.bind(this);
}

ParticleMovement.prototype.moveRandomly = function(){
	// console.log(`Particle: ${this.particle}, typeof: ${typeof this.particle}`);
	let selection = this.previousDirection1;
	let speed = Math.floor(Math.random() * getRange(speedRange.min, speedRange.max) + speedRange.min);

	if (this.movementRange1 >= this.movementRangeMax1) {
		this.movementRangeMax1 = Math.floor(Math.random() * getRange(moveInOneDirectionRange.min, moveInOneDirectionRange.max) + moveInOneDirectionRange.min);
		this.movementRange1 = 0;
		selection = Math.floor(Math.random() * 3);
		this.previousDirection1 = selection;
	}

	// 0 -> move up
	// 1 -> move down
	// 2 -> stay

	let topValue = parseFloat(this.particle.style.top);
	let leftValue = parseFloat(this.particle.style.left);
	let topTransitionValue = transitionMultiplier;
	let leftTransitionValue = transitionMultiplier;
	// console.log(`${topTransitionValue}s, ${leftTransitionValue}s`);

	if (this.particle.style.transition) {
		// https://stackoverflow.com/a/4572205
		const transitions = this.particle.style.transition.replace(/[^0-9.,]/g, '').split(',');
		// console.log(transitions)
		let topTransitionValue = parseFloat(transitions[0]);
		let leftTransitionValue = parseFloat(transitions[1]);
		// console.log(`Has transition. source: ${this.particle.style.transition}, transitions: ${transitions}, top: ${topTransitionValue}, left: ${leftTransitionValue}`)
		if (isNaN(topTransitionValue)) topTransitionValue = transitionMultiplier;
		if (isNaN(leftTransitionValue)) leftTransitionValue = transitionMultiplier;
	}

	switch (selection) {
		case 0:
			topValue -= speed;
			topTransitionValue = speed * transitionMultiplier;
			// console.log(`top 0 --> ${topTransitionValue}s, ${leftTransitionValue}s`);
			this.particle.style.transition = `top ${topTransitionValue}s, left ${leftTransitionValue}s`;
			this.particle.style.top = topValue + "px";
			// console.log(`UP with value ${speed} and current pos ${this.particle.style.top}`);
			break;
		case 1:
			topValue += speed;
			topTransitionValue = speed * transitionMultiplier;
			// console.log(`top 1 --> ${topTransitionValue}s, ${leftTransitionValue}s`);
			this.particle.style.transition = `top ${topTransitionValue}s, left ${leftTransitionValue}s`;
			this.particle.style.top = topValue + "px";
			// console.log(`DOWN with value ${speed} and current pos ${this.particle.style.top}`);
			break;
		default:
			topTransitionValue = transitionMultiplier;
			// console.log(`top default --> ${topTransitionValue}s, ${leftTransitionValue}s`);
			this.particle.style.transition = `top ${topTransitionValue}s, left ${leftTransitionValue}s`;
			break;
	}

	this.movementRange1++;

	// This is the stupidest thing ever lol

	selection = this.previousDirection2;
	speed = Math.floor(Math.random() * getRange(speedRange.min, speedRange.max) + speedRange.min);

	if (this.movementRange2 >= this.movementRangeMax2) {
		this.movementRangeMax2 = Math.floor(Math.random() * getRange(moveInOneDirectionRange.min, moveInOneDirectionRange.max) + moveInOneDirectionRange.min);
		this.movementRange2 = 0;
		selection = Math.floor(Math.random() * 3);
		this.previousDirection2 = selection;
	}

	// 0 -> move left
	// 1 -> move right
	// 2 -> stay

	topValue = parseFloat(this.particle.style.top);
	leftValue = parseFloat(this.particle.style.left);

	// if (this.previousDirection1 > 1) {
	// 	selection = Math.floor(Math.random() * 2);
	// }

	switch (selection) {
		case 0:
			leftValue -= speed;
			leftTransitionValue = speed * transitionMultiplier;
			// console.log(`left 0 --> ${topTransitionValue}s, ${leftTransitionValue}s`);
			this.particle.style.transition = `top ${topTransitionValue}s, left ${leftTransitionValue}s`;
			this.particle.style.left = leftValue + "px";
			// console.log(`LEFT with value ${speed} and current pos ${this.particle.style.top}`);
			break;
		case 1:
			leftValue += speed;
			leftTransitionValue = speed * transitionMultiplier;
			// console.log(`left 1 --> ${topTransitionValue}s, ${leftTransitionValue}s`);
			this.particle.style.transition = `top ${topTransitionValue}s, left ${leftTransitionValue}s`;
			this.particle.style.left = leftValue + "px";
			// console.log(`RIGHT with value ${speed} and current pos ${this.particle.style.top}`);
			break;
		default:
			leftTransitionValue = transitionMultiplier;
			// console.log(`left default --> ${topTransitionValue}s, ${leftTransitionValue}s`);
			this.particle.style.transition = `top ${topTransitionValue}s, left ${leftTransitionValue}s`;
			break;
	}

	// console.log(this.particle.style.transition);

	this.movementRange2++;

	// console.log(`Particle successfully moved to ${this.particle.style.top}`);
}

ParticleMovement.prototype.updateLifespan = function(){
	if (this.lifespan > this.maxLifespan) return true;
	this.lifespan++;
	// console.log(`Lifespan: ${this.lifespan}`);
	return false;
}

ParticleMovement.prototype.main = function(){
	if (this.updateLifespan()) return;
	this.moveRandomly();
	this.fade();
	requestAnimationFrame(this.main);
}

ParticleMovement.prototype.fade = function() {
	if(this.lifespan > this.fadeOutValue) {
		const value = (this.maxLifespan - this.lifespan)/(this.maxLifespan - this.fadeOutValue)
		this.particle.style.opacity = value;
		this.particle.style.transform = `scale(${value})`;
	}
	else if(this.lifespan < this.fadeInValue) {
		const value = this.lifespan / this.fadeInValue;
		this.particle.style.opacity = value;
		this.particle.style.transform = `scale(${value})`;
	}
}

if (window.innerWidth > 650) {
	spawnParticles();
}

function spawnParticles(){
	// for (const particle of particles
	// ) {
	// 	const pos = generateRandomSpawnPosition();
	// 	particle.style.top = pos.x + "px";
	// 	particle.style.left = pos.y + "px";
	// 	console.log(`Move Particle ${particle}`);

	// 	let particleMovement = new ParticleMovement(particle, 0, 0, 0, 0, 0, 0, 0);
	// 	particleMovement.main();
	// 	// particleMovement.mainFunc = particleMovement.mainFunc.bind(particleMovement);
	// 	// particleMovement.particle = particle;
	// 	// particleMovement.lifespan = 0;
	// 	// particleMovement.mainFunc();
	// }

	
	currentSpawnDelayValue++;
	// console.log(`value ${currentSpawnDelayValue} vs delay ${spawnDelay}`);
	
	if(currentSpawnDelayValue > spawnDelay) {
		// create a new div element
		let newParticle = getInactiveParticle();
		if (newParticle == null) {
			newParticle = document.createElement("div");
			newParticle.classList.add("particle");
			document.body.insertBefore(newParticle, homePageDiv);
		}

		const pos = generateRandomSpawnPosition();
		newParticle.style.top = pos.y + "px";
		newParticle.style.left = pos.x + "px";
		const size = Math.floor(
			Math.random() * getRange(
				sizeRange.min, sizeRange.max
			) + sizeRange.min
		);
		newParticle.style.width = size + "px";
		newParticle.style.height = size + "px";
		newParticle.style.boxShadow = `0px 0px ${size+glowSizeOffset}px ${size+glowSizeOffset}px var(--glow)`;
		console.log(`Created New Particle ${newParticle}`);

		let particleMovement = new ParticleMovement(newParticle);
		particleMovement.main();

		spawnDelay = Math.random() * getRange(spawnDelayRange.min, spawnDelayRange.max) + spawnDelayRange.min;
		currentSpawnDelayValue = 0;
	}

	requestAnimationFrame(spawnParticles);
}

function generateRandomSpawnPosition(){
	return {
		x: Math.floor(
			Math.random() * getRange(
				xCoordRange.min, xCoordRange.max
			) + xCoordRange.min
		), 
		y: Math.floor(
			Math.random() * getRange(
				yCoordRange.min, yCoordRange.max
			) + yCoordRange.min
		)
	}
}