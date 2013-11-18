
$('.progress .progress-bar').progressbar(); 

$('#searchForm').hide();

$('#pbar').show();
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

$('.returnForm').hide();
$('#returnOption').click(function() {
	updateReturnDate();
	$('.returnForm').show();
});

$('#depDate').change(function() {
	updateReturnDate();
});

function updateReturnDate() {
	$('#retDate').attr('min', $('#depDate').val());
	$('#retDate').val($('#depDate').val());		
}

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
var retTableData = [];
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

		$('#pbar').hide();
		$('#searchForm').show();
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
var currTable;
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
			$(currTable).hide();
			$("#searchForm").hide();
			$("#filterTable").hide();
			$("#filterButton").hide();
			$("#innerContainer").append("<p>" + bookResponse + "</p><br/>");
		}
	});
};

var flightNum;
var departureDetails;
var seatClass;

$(document).on("click", function() {
	
	if($(event.target).attr("class") != undefined && $(event.target).attr("class").indexOf("bookButton") != -1) {
		currTable = "#" + $(event.target).closest('table').attr('id');
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
function updateFilters() {
	$("#flightsFound label").remove();
	flightFilter.length = 0;
	$.ajax({
		type: "POST",
		url: "/getCarrierListAsQuery.php",
		data: { data: JSON.stringify(formData)},
		success: function(data) {

			parsedData = $.parseJSON(data);
			$.each(parsedData, function () {
				flightFilter.push(this.toString());
			});
		},
		complete: function() {
			$.each(flightFilter, function(){
				$("#flightsFound").append($("<label class='checkbox'><input type='checkbox' value='' checked>" + this + "</label>").val(this.toString()));
			});	
		}
	});
}
retFormData = {};
$("#searchForm").on("submit", function(event) {
	event.preventDefault();
	$('.progress-bar').attr('aria-valuenow', '0');
	$('.progress-bar').css('width', '0%');
	$('#pbar').show();
	$('.progress .progress-bar').progressbar();
	$(this).hide();
	formData["from"] = $("#depCities").val();
	formData["to"] = $("#arrCities").val();
	formData["seatClass"] = $("#seatClass").val();
	formData["depDate"] = $("#depDate").val();
	console.log(formData["depDate"]);
	formData["numPeople"] = $("#numPeople").val();
	if($('#priceOrder').is(':checked')) {
		formData["priceOrder"] = "order";
		//console.log("check");
	} else {
		formData["priceOrder"] = "noOrder";	
	}
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
			console.log(tableData);
			if(tableData.length===0) {
				$('#innerContainer').append("<p class = 'text-danger'><strong>No flights found.</strong></p>");
			} else {
				$("#resultsTable thead").remove();
				$("#resultsTable tbody").remove();
				$("#resultsTable").append("<thead><tr>" + printTableHead() +"</tr></thead><tbody>");
				$.each(tableData, function() {
					$("#resultsTable").append("<tr>" + printTupleData(this) +"</tr>");
				});
				$("#resultsTable").append("</tbody>");

				//updateFilters();
				/*$(".filters").show();*/
			}
			$('#pbar').hide();
			$("#searchForm").removeClass("searchPos");
			$("#searchForm").addClass("updatedSearchPos");	
		}
	});
	if($('#retDate').val() !== "" && $('#returnOption').is(':checked')) {
		retFormData["from"] = $("#arrCities").val();
		retFormData["to"] = $("#depCities").val();
		retFormData["seatClass"] = $("#seatClass").val();
		retFormData["depDate"] = $("#retDate").val();
		retFormData["numPeople"] = $("#numPeople").val();
		if($('#priceOrder').is(':checked')) {
			retFormData["priceOrder"] = "order";
		} else {
			retFormData["priceOrder"] = "noOrder";	
		}
		var parsedRet;
		$.ajax({
			type: "POST",
			url: "/searchForFlights.php",
			data: { data: JSON.stringify(retFormData)},
			success: function(data) {
				parsedRet = $.parseJSON(data);
				$.each(parsedRet, function() {
					retTableData.push(this);
				});
			},
			complete: function() {
				if(retTableData.length === 0) {
					$('#innerContainer').append("<p class = 'text-danger'><strong>No  return flights found.</strong></p>");
				} else {
					$("#returnResultsTable thead").remove();
					$("#returnResultsTable tbody").remove();
					$("#returnResultsTable").append("<thead><tr>" + printTableHead() +"</tr></thead><tbody>");
					$.each(retTableData, function() {
						$("#returnResultsTable").append("<tr>" + printTupleData(this) +"</tr>");
					});
					$("#returnResultsTable").append("</tbody>");
				}
			}
		});
	}
});
