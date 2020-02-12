import {svg, projection, width, height} from './main.js';

export function drawTimeline() {
	svg.append('rect')
		.attr("x", 0)
		.attr("y", height)
		.attr('width', width)
		.attr('height', 200)
		.style('fill', 'red')
}

