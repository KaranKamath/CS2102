var formData = {
	from: "",
	to: "",
	seatClass: "",
	depDate: "",
	numPeople: ""
};

var bookDetails = {
	flightNo: "",
	departureTime: "",
	seatClass: "",
	numSeats: ""
};

$(".filters").hide();

function setUp() {
	$("#numPeople").val("1");
};
setUp();
updateRangeValue();

function updateRangeValue() {
	numSelected.innerHTML = numPeople.value;
}

function updatePriceSlider() {
	priceSelected.innerHTML = priceRange.value;
}

var flightFilter = [""];
var departureCities = [""];
var arrivalCities = [""];
var seatClasses = [""];
var tableData = [];

$.ajax({
	type: "POST",
	url: "/getColumn.php",
	data: { data: JSON.stringify({"table":"seat", "column":"seat_class"})},
	success: function(data) {
		parsedData = $.parseJSON(data);

		$.each(parsedData, function () {
			seatClasses.push(this.toString());
		});
	},
	complete: function() {
		$.each(seatClasses, function(){
			$('#seatClass').append($('<option>' + this + '</option>').val(this.toString()));
		});	
	}
});

$.ajax({
	type: "POST",
	url: "/getColumn.php",
	data: { data: JSON.stringify({"table":"flight", "column":"departure_destination"})},
	success: function(data) {
		parsedData = $.parseJSON(data);
		
		$.each(parsedData, function () {
			departureCities.push(this.toString());
		});
	},
	complete: function() {
		$.each(departureCities, function(){
			$('#depCities').append($('<option>' + this + '</option>').val(this.toString()));
		});	
	}
});

$.ajax({
	type: "POST",
	url: "/getColumn.php",
	data: { data: JSON.stringify({"table":"flight", "column":"arrival_destination"})},
	success: function(data) {
		parsedData = $.parseJSON(data);
		
		$.each(parsedData, function () {
			arrivalCities.push(this.toString());
		});
	},
	complete: function() {
		$.each(arrivalCities, function(){
			$('#arrCities').append($('<option>' + this + '</option>').val(this.toString()));
		});	
	}
});

function bookFlight(dataJSON) {
	var bookResponse = "";
	$.ajax({
		type: "POST",
		url: "/makeBooking.php",
		data: { data: dataJSON },
		success: function(data) {
			bookResponse += data; 
		},
		complete: function() {
			$("#resultsTable").hide();
			$("#searchForm").hide();
			$("#filterTable").hide();
			$("#filterButton").hide();
			$("#innerContainer").append("<p>" + bookResponse + "</p>");
		}
	});
};

var flightNum;
var departureDetails;
var seatClass;

$(document).on("click", function() {
	
	if($(event.target).attr("class") != undefined && $(event.target).attr("class").indexOf("bookButton") != -1) {
		flightNum = $(event.target).closest('button').data('flightno');
		departureDetails = $(event.target).closest('button').data('departure_details');
		seatClass = $(event.target).closest('button').data('seat_class');
		$("#bookingDetails").empty();
		$("#bookingDetails").append("<p><h5>You have chosen to book:</h5><br/><strong>Flight Number: </strong>" 
			+ flightNum + "<br/><strong>Departure Time: </strong>" + departureDetails
			+ "<br/><strong>Seat Class: </strong>" + seatClass + "<br/><strong>Number of Seats: </strong>" + $("#numPeople").val() + 
			"</p>");
	}
});


$("#userDetails").on("submit", function(event) {
	event.preventDefault();
	$("#bookModal").modal("hide");

	bookDetails["flightNo"] = flightNum;
	bookDetails["departureTime"] = departureDetails
	bookDetails["seatClass"] = seatClass;
	bookDetails["numSeats"] = $('#numPeople').val();
	bookDetails["email"] = $("#emailField").val();
	bookDetails["contact"] = $("#contact").val();
	bookDetails["name"] = $("#passName").val();

	var bookJSON = JSON.stringify(bookDetails);
	bookFlight(bookJSON);
});

$("#searchForm").on("submit", function(event) {
	event.preventDefault();
	$(this).hide();
	formData["from"] = $("#depCities").val();
	formData["to"] = $("#arrCities").val();
	formData["seatClass"] = $("#seatClass").val();
	formData["depDate"] = $("#depDate").val();
	formData["numPeople"] = $("#numPeople").val();

	var formJSON = JSON.stringify(formData);
	tableData.length = 0;
	console.log(formJSON);
	$.ajax({
		type: "POST",
		url: "/searchForFlights.php",
		data: { data: formJSON },
		success: function(data) {
			//console.log(data);
			parsedResult = $.parseJSON(data);
			$.each(parsedResult, function() {
				tableData.push(this);
			});
		},
		complete: function() {
			$("#resultsTable thead").remove();
			$("#resultsTable tbody").remove();
			$("#resultsTable").append("<thead><tr>" + printTableHead() +"</tr></thead><tbody>");
			$.each(tableData, function() {
				$("#resultsTable").append("<tr>" + printTupleData(this) +"</tr>");
			});
			$("#resultsTable").append("</tbody");
			function printTableHead() {
				tuple = "";
				tuple += ("<th>Flight Number</th>");
				tuple += ("<th>From</th>");
				tuple += ("<th>To</th>");
				tuple += ("<th>Departure Date/Time</th>");
				tuple += ("<th>Arrival Date/Time</th>");
				tuple += ("<th>Airline</th>");
				tuple += ("<th>Aircraft Model</th>");
				tuple += ("<th>Price</th>");
				tuple += ("<th>Book Option</th>");	
				return tuple;
			};


			function printTupleData(data) {
				tuple = "";
				tuple += ("<td>" + data["flight_no"] + "</td>");
				tuple += ("<td>" + data["departure_destination"] + "</td>");
				tuple += ("<td>" + data["arrival_destination"] + "</td>");
				tuple += ("<td>" + data["departure_details"] + "</td>");
				tuple += ("<td>" + data["arrival_details"] + "</td>");
				tuple += ("<td>" + data["carrier_name"] + "</td>");
				tuple += ("<td>" + data["plane_model_no"] + "</td>");
				tuple += ("<td>$" + data["price"] + "</td>");
				tuple += ("<td><button data-toggle = 'modal' data-target = '#bookModal' class = 'btn btn-primary bookButton' data-flightNo = \"" 
					+ data["flight_no"] + 
					"\" data-departure_details = \"" + data["departure_details"] + "\" data-seat_class = \"" + 
					data["seat_class"] + "\">Book Now</button></td>");
				return tuple;
			};
			updateFilters();
			$(".filters").show();
			$("#searchForm").removeClass("searchPos");
			$("#searchForm").addClass("updatedSearchPos");	
		}
	});

function updateFilters() {
	$("#flightsFound label").remove();
	flightFilter.length = 0;
	//console.log(formData);
	$.ajax({
		type: "POST",
		url: "/getCarrierListAsQuery.php",
		data: { data: JSON.stringify(formData)},
		success: function(data) {
			//console.log(data);
			parsedData = $.parseJSON(data);
			$.each(parsedData, function () {
				flightFilter.push(this.toString());
			});
		},
		complete: function() {
			//console.log("returned filter: " + flightFilter);
			$.each(flightFilter, function(){
				$("#flightsFound").append($("<label class='checkbox'><input type='checkbox' value='' checked>" + this + "</label>").val(this.toString()));
			});	
		}
	});
}
});