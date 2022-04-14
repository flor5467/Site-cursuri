
document.getElementById('filtrare').onclick = function(ev) {
	
	ev.preventDefault();
	
	filtrare();
	
};

function filtrare() {
	
	var curs_sel = document.getElementById('curs').value;
	var profesoara_sel = document.getElementById('profesoara').value;

	
	var content_elements = document.getElementById('content').getElementsByTagName('div');
	
	//for (let i in content_elements) {
		
	for (let i = 0; i < content_elements.length; i++) {
		
		let content_element = content_elements[i];
		
		let curs_el = content_element.getAttribute('data-curs');
		let profesoara_el = content_element.getAttribute('data-profesoara');
		
		
		let curs_cond = (curs_sel == 'all') || (curs_sel == curs_el);
		let profesoara_cond = (profesoara_sel == 'all') || (profesoara_sel == profesoara_el);
		
		if (curs_cond && profesoara_cond) {
		
			content_element.style.display = 'block';
			
		} else {
		
			content_element.style.display = 'none';
			
		}
		
	}
	
}








