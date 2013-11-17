var $logButton = $("<input/>");
var $addFlightButton = $("<input/>");
var $delBookingButton = $("<input/>");

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
	$('#innerContainer').empty();
	$('#newFlightContainer').empty();
	$logButton.attr({ value: 'Log Out'});
	//$('#newFlightContainer').append($addFlightButton);
	buildTable();
}
$('#adminLogInForm').append($logButton);

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
					buildTable();
				} else {
					$('#innerContainer').empty();
					$('#innerContainer').append("<p class='text-danger'><strong>Incorrect Credentials</strong></p>");
				}
			}
		});		
		
	} else {
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
			$("#innerContainer").append("<table id = 'bookingsTable' class = 'table'><thead></thead><tbody></tbody></table>");
			addTableHeads();
			$.each(tableData[0], function(){
				$('#bookingsTable tbody').append("<tr>" + addTableData(this) + "</tr>");
			});
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
	tuple += "<td>"+ data["pnr"] +"</td>";
	tuple += "<td>"+ data["flight_no"] +"</td>";
	tuple += "<td>"+ data["departure_details"] + "<br/>" + data["departure_destination"] +"</td>";
	tuple += "<td>"+ data["arrival_details"] + "<br/>" + data["arrival_destination"] +"</td>";
	tuple+="<td>"+ data["class_travel"] + "</td>";	
	tuple+="<td>"+ data["no_people"] + "</td>";
	tuple+="<td>"+ data["passenger_name"] + "<br/>" + data["email"] + "<br/>"+ data["contact_no"] + "</td>";
	return tuple;
};