<?php include 'base.html'; ?>
<div id = "outerContainer">
	<div id  = "innerContainer" class = "row-fluid">
		<div class="progress progress-striped active" id='pbar'>
			<div class="progress-bar"  role="progressbar" aria-valuetransitiongoal = "100" aria-valuemin="0" aria-valuemax="100">
			</div>
		</div>
		<form id = "searchForm" class = "text-center searchPos">
			<fieldset>
				<br/>
				<div class = "row-fluid">
					<label>Departure City: </label>
					<select id = "depCities" name = "fromCity" required></select>
					<label>      Arrival City: </label>
					<select id = "arrCities" name = "toCity" required></select>
					<label>Seat Class: </label>
					<select id = "seatClass" name = "class" required>
					</select> 
					<label>Date of Departure:</label>
					<input name = "departureDate" id = "depDate" type = "date" required></input> 
					<br/><br/>
					<strong>1</strong><input name = "numPeople" id = "numPeople" type = "range" 
					min = "1" max = "150" default = "1" onchange = "updateRangeValue();" required></input><strong>150</strong>
					<br/><span class = "pull right"><strong>Selected Seats: <output id="numSelected">&nbsp;</output></strong><span>
					<br/><br/>
					<input type = "radio" id = "priceOrder"><strong>Order By Price</strong></input>
					<br/><br/>
					<input type = "radio" id = "returnOption"><strong>Return Flight</strong></input>
					<br/><br/>
					<label class = "returnForm">Date of Return:</label>
					<input name = "returnDate" id = "retDate" class = "returnForm" type = "date"></input> 
					<br/><br/>
					<input class = "btn btn-primary" type = "submit" value = "Search for Flights"></input>
				</div>
			</fieldset>
		</form>
		<br/>
		<table id = "resultsTable" class = "table">
		</table><br/>
		<table id = "returnResultsTable" class = "table">
		</table>
		<br/>
		<div class = "filters row-fluid text-center">
			<form id = "filterForm" class = "form-horizontal">
				<table id = "filterTable">
					<fieldset>
						<thead>
							<tr>
								<th>Carriers</th>
								<th>Price Range </th>
								<th>TimeRange</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td id = "flightsFound">
								</td>
								<td>
									$0
									<input id = "priceRange" type = "range" 
									min = "0" max = "1000" default = "1" onchange = "updatePriceSlider()"></input>
									$1000
									<br/>
									<strong>Max Price: <output id="priceSelected">&nbsp;</output></strong>
								</td>
								<td>
									<label>From: </label>
									<input id="start-time" type="time"/> <label>To: </label> <input id="end-time" type="time"/>
								</td>
							</tr>
						</tbody>
					</fieldset>
				</table>
				<br/>
				<input id = "filterButton" class = "btn btn-primary center" type = "submit" value = "Filter"></input>
			</form>
		</div>
		<br/>
		<p id = "Log"></p>
	</div>

	<!-- Modal -->
	<div class="modal fade" id="bookModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">Enter Details</h4>
				</div>
				<div class="modal-body" id = "bookingDetails">
				</div>
				<div id="UserForm" class="modal-body container">
					<form id = "userDetails">
						<fieldset>
							<label>Name: </label>
							<input type="text" id="passName" name="passname" required/>
							<br/><br/>
							<label>Email: </label>
							<input type="email" id="emailField" name="email_addr" required />
							<br/><br/>
							<label>Contact Number: </label>
							<input type="text" id="contact" name="contactno" pattern = "[0-9]{10}" required/>
							<br/>
							<input type = "submit" value = "Book" class="btn btn-primary" id = "userFieldsSubmitButton"/>
						</fieldset>	
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	<script type = "text/javascript" src = "js/flightSearch.js"></script>
</div>