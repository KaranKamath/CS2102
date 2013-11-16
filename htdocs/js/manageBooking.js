$("#bookingTable").hide();
var tableRows = [""];
$("#retrieveBookingForm").on("submit", function(event){
	event.preventDefault();
	$(this).hide();
	var pnr = $("#PNR").val();
	json = JSON.stringify(pnr);
	//console.log(json);
	tableRows.length = 0;
	$.ajax({
		type: "POST",
		url: "retrieveBooking.php",
		data: { pnr: json},
		success: function(data) {
			parsedResult = $.parseJSON(data);
			//console.log(parsedResult);
			$.each(parsedResult, function() {
				tableRows.push(this);
			});
			//console.log(tableRows);
		},
		complete: function() {
			$.each(tableRows, function() {
				$("#bookingTable tbody").append("<tr>" + addTableData(this) +"</tr>");
			});
			if(tableRows.length !== 0) {
				$("#bookingTable").show();
				$("#delCont").append("<button id = \"delButton\" type = 'submit' class = 'btn btn-primary' value = 'Delete Booking' data-pnr = \"" 
					+ tableRows[0]['pnr'] + "\" data-flight_no = \"" 
					+ tableRows[0]['flight_no'] + "\" data-seat_class = \"" 
					+ tableRows[0]['class_travel'] + "\"data-numPeople = \"" 
					+ tableRows[0]['no_people'] + "\" data-depDetails = \"" 
					+ tableRows[0]['departure_details'] + "\">Delete Booking</button>");
			}
			else
				$("#outerContainer").append("<p class = \"text-danger\" ><strong>No Bookings Were Found. Check Entered PNR.</strong></p>");
		}
	});
});

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
$(document).on("click", function() {
	
	if($(event.target).attr("id") != undefined && $(event.target).attr("id").indexOf("delButton") != -1) {
		var delData = {};
		delData["pnr"] = $(event.target).closest('button').data('pnr').toString();
		delData["flight"] = $(event.target).closest('button').data('flight_no');
		delData["seatClass"] = $(event.target).closest('button').data('seat_class');
		delData["numPeople"] = $(event.target).closest('button').data('numpeople');
		delData["depDetails"] = $(event.target).closest('button').data('depdetails');
		
		console.log(delData);
		jsonDelData = JSON.stringify(delData);
		console.log(jsonDelData);

		var delResponse = "";
		//console.log(pnr);
		$.ajax({
			type: "POST",
			url: "deleteBooking.php",
			data: {data : jsonDelData},
			success: function(data) {
				delResponse += data;
			},
			complete: function() {
				$("#bookingTable").hide();
				$("#delCont").hide();
				$("#outerContainer").append("<div><h2>" + delResponse + "</h2></div>");
			}
		});
	}
});