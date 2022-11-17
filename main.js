const canvas = document.getElementById('element');
canvas.width = 200;

const context = canvas.getContext('2d');
const road = new RoadModel(canvas.width/2, canvas.width*.9);
const car = new CarModel(road.getLaneCenter(1), 100, 30, 50);

function animate() {
	car.update();

	canvas.height = window.innerHeight;

	context.save();
	context.translate(0, -car.y + canvas.height*.7);

	road.draw(context);
	car.draw(context);

	context.restore();
	requestAnimationFrame(animate);
}

animate();