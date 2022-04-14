
function inmultire() {
	
	var x_val = document.getElementById('x').value;
	var y_val = document.getElementById('y').value;
	
	x_val = Number(x_val);
	y_val = Number(y_val);
	
	var inmultire = x_val * y_val;
	
	var output = x_val + ' * ' + y_val + ' = ' + inmultire + '<br>';

	document.getElementById('results').innerHTML += output;
	
}