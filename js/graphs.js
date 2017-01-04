function changeSkillSet() {
	$("#skillset").on('click', 'rect',function() {		
		var selected = $(this).attr('id');

		if ( selected ) {
			$(".skillset__wrapper").addClass('subskillset');
			skillsetChart(skillset[selected]);
		}
	});

	$("#skillset__back").on('click', function() {
		skillsetChart(skillset.general);
		$(".skillset__wrapper").removeClass('subskillset');
	});
}

function skillsetChart(skills) {	
	d3.select("#skillset g").remove() //remove any previous charts

	var margin = {top: 30, left:50, right: 10},
		width = $('#skillset').width() - margin.left - margin.right,
		height = $('#skillset').height() - margin.top*2;

	var barHeight = d3.scale.linear()
					.range([height, 0])
					.domain([0, 10000]);

	var barWidth = d3.scale.ordinal()
						.domain(skills.map(function(s){return s.name}))
						.rangeRoundBands([0,width],0.5);

	var xAxis = d3.svg.axis()
					.scale(barWidth)
					.orient("bottom");

	var yAxis = d3.svg.axis()
					.scale(barHeight)
					.orient("left");	

	// Chart
	var chart = d3.select("#skillset")
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")" );

	// X axis
	chart.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

	// Y axis
	chart.append("g")
			.attr("class", "y axis")
			.call(yAxis);

	// Bar containers
	var bar = chart.selectAll("g")
					.data(skills)
				.enter().append("g")
					.attr("transform", function(s, i) { return "translate(" + barWidth(s.name)  + ",0)"; });


	// Bar rectangles	
	chart.selectAll(".skillset__bar")
			.data(skills)
		.enter().append("rect")
			.attr("class", "skillset__bar")
			.attr("id", function(s) { return s.key } ) //only general classes have a key
			.attr("x", function(s) { return barWidth(s.name); })			
			.attr("width", barWidth.rangeBand())			
			.attr("y", height)
			.attr("height", 0	)
			.transition()
			.delay(150)
			.duration(750)
			.attr("height", function(s) { return height - barHeight(s.value); })
			.attr("y", function(s) { return barHeight(s.value); });
	
	// Legend
	chart.append("g")
			.attr("class", "y axis")
		.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Power");
}

var skillset = {
	general: [
		{ name: "javascript", key: "javascript_skills" , value: 9500 },
		{ name: "html", key: "html_skills" , value: 9500 },
		{ name: "backend", key: "backend_skills" , value: 4000 },
		{ name: "design", key: "design_skills" , value: 6000 },
		{ name: "usability", key: "usability_skills" , value: 2000 }
	],
	javascript_skills: [
		{ name:"Vainilla" , value: 9500 }, //It's over 9000!
		{ name:"Jquery" , value: 9000 },
		{ name:"Coffescript" , value: 6500 },
		{ name:"Angular" , value: 7000 },
		{ name:"Knockout" , value: 5500 },
		{ name:"Architecture" , value: 7000 },
		{ name:"Yeoman" , value: 2500 },
		{ name:"Spinejs" , value: 5000 },
		{ name:"Game engines" , value: 2500 }
	],
	html_skills: [
		{ name: "css", value: 9500 },
		{ name: "html", value: 9500 },
		{ name: "smacss", value: 8000 },
		{ name: "less", value: 9000 },
		{ name: "scss", value: 9000 },
		{ name: "architecture", value: 9000 }
	],
	backend_skills: [
		{ name: "rails", value: 5000 },
		{ name: "mysql", value: 3000 },		
		{ name: "tdd", value: 2000 },
		{ name: "nodejs", value: 2500 },
		{ name: "architecture", value: 5000 },
		{ name: "apidevelopment", value: 6000 }
	],
	design_skills: [
		{ name: "colortheory" , value: 6000 },
		{ name: "layout" , value: 5000 },
		{ name: "typography" , value: 4000 },
		{ name: "wireframing" , value: 7000 },
		{ name: "drawing" , value: 7000 },
		{ name: "inkscape" , value: 9500 },
		{ name: "gimp" , value: 6500 },
		{ name: "photoshop" , value: 2000 },
		{ name: "illustrator" , value: 2000 },
	],
	usability_skills: [
		{ name: "ux" , value: 2000 },
		{ name: "gamification" , value: 2500 },
		{ name: "psychology" , value: 1000 },
		{ name: "affordance" , value: 1000 },
		{ name: "learnability" , value: 2000 }
	]
}