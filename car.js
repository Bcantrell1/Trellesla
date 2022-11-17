class CarModel {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.speed = 0;
		this.topSpeed = 3;

		this.acceleration = 0.2;
		this.friction = 0.05;
		this.brakeMultiplier = 0.2;

		this.angle = 0;

		this.controls = new Controls();
	}

	update() {
		// Accelerate and decelerate
		if (this.controls.forward) {
			this.speed += this.acceleration;
		}
		if (this.controls.backward) {
			this.speed -= this.acceleration;
		}

		if(this.speed > this.topSpeed) {
			this.speed = this.topSpeed;
		}
		if(this.speed < -this.topSpeed) {
			this.speed = -this.topSpeed;
		}

		if(this.speed > 0) {
			this.speed -= this.friction;
		}
		if(this.speed < 0) {
			this.speed += this.friction;
		}

		if(Math.abs(this.speed) < this.friction) {
			this.speed = 0;
		}

		
		// Turn
		if(this.speed != 0) {
			if(this.controls.brakes && this.speed > 1) {
				this.speed -= this.brakeMultiplier;
			}
			if (this.controls.left) {
				this.angle += 0.03;
			}
			if (this.controls.right) {
				this.angle -= 0.03;
			}
		}

		//Update position
		this.x-=Math.sin(this.angle)*this.speed;
		this.y-=Math.cos(this.angle)*this.speed;
	}

	draw(context) {
		context.save();
		context.translate(this.x, this.y);
		context.rotate(-this.angle);
		context.beginPath();
		context.rect(
			-this.width/2,
			-this.height/2,
			this.width,
			this.height,
		);
		context.fillStyle = '#fff';
		context.fill();
	}
}