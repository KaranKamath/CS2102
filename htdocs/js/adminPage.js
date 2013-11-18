var $logButton = $("<input/>");
var $addFlightButton = $("<input/>");
var $delBookingButton = $("<button/>");
$delBookingButton.attr({type: 'button', value: 'Delete Booking', class: 'btn btn-primary delButton', onclick: 'deleteAssBooking()'});
$delBookingButton.append("Delete Booking");

$('#changeBut').hide();
$('#changeBut').click(function() {
	$('#changePane').empty();
	$('#flightNum').val('');
	$('#newDepDate').val("");
	$('#oldDepDate').val("");	
});

$addFlightButton.attr({type: 'submit', value: 'Add New Flight', class: 'btn btn-primary'});
var tableData = [];
$logButton.attr({type: 'submit', class: 'btn btn-primary'});
$logInDetailsFields = "<label>Admin Name:&nbsp</label><input type='text' id='adminName'></input><br/>" + 
"<label>Password:&nbsp&nbsp&nbsp&nbsp&nbsp</label><input type = 'password' id='adminPass'></input><br/>";
if($.cookie('admin') == undefined) {
	$('#innerContainer').empty();
	$('#newFlightContainer').empty();
	$('#adminLogInForm').append($logInDetailsFields);
	$logButton.attr({value: 'Log In'});
	
} else {
	$('#changeBut').show();
	$('#innerContainer').empty();
	$('#newFlightContainer').empty();
	$logButton.attr({ value: 'Log Out'});
	//$('#newFlightContainer').append($addFlightButton);
	buildTable();
}
$('#adminLogInForm').append($logButton);


$('#flightDetails').on("submit", function(event) {
	event.preventDefault();
	var flightChangeRes = "";
	var adminInput = {};
	adminInput["flightNo"] = $('#flightNum').val().toString();
	adminInput["oldDetails"] = $('#oldDepDate').val().toString();
	adminInput["newDetails"] = $('#newDepDate').val().toString();
	var uJson = JSON.stringify(adminInput);

	console.log(uJson);
	$.ajax({
		type: "POST",
		url: "changeFlightDetails.php",
		data: {data: uJson},
		success: function(data) {
			flightChangeRes += data;
		},
		complete: function() {
			$('#changePane').append("<p class = 'text-info'><strong>" + flightChangeRes + "</strong></p>");
		}
	});
});

$('#adminLogInForm').on('submit', function(event) {
	event.preventDefault();
	var response = "";
	if($.cookie('admin') == undefined) {
		formData = {};
		formData["adminName"] = $('#adminName').val();
		formData["adminPass"] = $('#adminPass').val();
		
		$.ajax({
			type: "POST",
			url: "checkAdmin.php",
			data: {credentials: JSON.stringify(formData)},
			success: function(data) {
				response += data;
			},
			complete: function() {
				if (response=="true"){
					$("#innerContainer").empty();
					$('#adminLogInForm').empty();
					$('#newFlightContainer').empty();
					$logButton.attr({value: 'Log Out'});
					$('#adminLogInForm').append($logButton);
					//$('#newFlightContainer').append($addFlightButton);	

					$.cookie('admin', 'loggedIn');
					$('#changeBut').show();
					buildTable();
				} else {
					$('#innerContainer').empty();
					$('#innerContainer').append("<p class='text-danger'><strong>Incorrect Credentials</strong></p>");
				}
			}
		});		
		
	} else {
		$('#changeBut').hide();
		$.removeCookie('admin');
		$('#innerContainer').empty();
		$('#adminLogInForm').empty();
		$('#newFlightContainer').empty();
		$logButton.attr({value: 'Log In'});
		$('#adminLogInForm').append($logInDetailsFields);
		$('#adminLogInForm').append($logButton);
	}
});

function buildTable(){
	tableData.length = 0;
	var parsedResult = "";
	$.ajax({
		type: "POST",
		url: "getAllBookings.php",
		success: function(data) {
			parsedResult = $.parseJSON(data);
			tableData.push(parsedResult);
		},
		complete: function() {
			console.log(tableData);
			if(tableData[0].length == 0) {
				$("#innerContainer").append("<p class = 'info'><strong>No Bookings Found</strong></p>");
			} else {
				$("#innerContainer").append("<table id = 'bookingsTable' class = 'table'><thead></thead><tbody></tbody></table>");
				addTableHeads();
				$.each(tableData[0], function(){
					$('#bookingsTable tbody').append("<tr>" + addTableData(this) + "</tr>");
				});
				$(".delButtonTD").append($delBookingButton);
			}
		}
	});
};

function addTableHeads() {
	$('#bookingsTable thead')
	.append("<tr><th>PNR</th><th>Flight Number</th><th>Departure Details</th><th>Arrival Details</th>" + 
		"<th>Seat Class</th><th>Number of Seats</th><th>Passenger Information</th><th>Delete Booking</th></tr>");
};

function addTableData(data) {
	var tuple = "";
	tuple += "<td class = 'pnrTD'>"+ data["pnr"] +"</td>";
	tuple += "<td>"+ data["flight_no"] +"</td>";
	tuple += "<td>"+ data["departure_details"] + "<br/>" + data["departure_destination"] +"</td>";
	tuple += "<td>"+ data["arrival_details"] + "<br/>" + data["arrival_destination"] +"</td>";
	tuple+="<td>"+ data["class_travel"] + "</td>";	
	tuple+="<td>"+ data["no_people"] + "</td>";
	tuple+="<td>"+ data["passenger_name"] + "<br/>" + data["email"] + "<br/>"+ data["contact_no"] + "</td>";
	tuple+="<td class = 'delButtonTD'></td>";
	return tuple;
};

function deleteAssBooking() {
	var delData = {};
	var currPNR = $(event.target).parent().parent().children("td:first")[0].innerHTML.toString();
	var currFlight = $(event.target).parent().parent().children("td")[1].innerHTML.toString();
	var depDetails = $(event.target).parent().parent().children("td")[2].innerHTML.toString().substr(0,19);
	var seatClass = $(event.target).parent().parent().children("td")[4].innerHTML.toString();
	var numPeople = $(event.target).parent().parent().children("td")[5].innerHTML.toString();
	var delResponse = "";
	delData["pnr"] = currPNR;
	delData["flight"] = currFlight;
	delData["depDetails"] = depDetails;
	delData["seatClass"] = seatClass;
	delData["numPeople"] = numPeople;
	jsonData = JSON.stringify(delData);
	
	$(event.target).removeClass("delButton");
	$(event.target).removeClass("btn-primary");
	$(event.target).addClass("btn-danger");
	$(event.target).removeAttr("onclick");
	$(event.target).empty().append("Booking Deleted");

	$.ajax({
		type: "POST",
		url: "deleteBooking.php",
		data: {data : jsonData},
		success: function(data) {
			delResponse += data;
		},
		complete: function() {
			$(event.target).parent().parent().children("td")[7].outerHTML="<p class = 'text-danger'><strong>" + delResponse + "</strong></p>";
		}
	});
}