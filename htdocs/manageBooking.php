<?php include 'base.html'; ?>
<div id = "outerContainer" class = "row-fluid">
	<form id = "retrieveBookingForm" class = "text-center formRetrieve">
		<fieldset>
			<label><strong>Enter PNR: </strong></label>
			<input type = "text" id = "PNR" required></input>
			<input type = "submit" class = "btn btn-primary" value = "Retrieve Booking"> </input>
		</fieldset>
	</form>
	<table id = "bookingTable" class = "table">
		<thead>
			<tr>
				<th>PNR</th>
				<th>Flight Number</th>
				<th>Departure Details</th>
				<th>Arrival Details</th>
				<th>Seat Class</th>
				<th>Number of Seats</th>
				<th>Passenger Information</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
	<div id = "delCont" class = "row-fluid text-center">
	</div>
</div>
<script type = "text/javascript" src = "js/manageBooking.js"></script>