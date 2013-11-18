<?php include 'base.html'; ?>
<div id = "outerContainer" class = "container">
	<form id = "adminLogInForm" class = "pull left">
	</form>
	<div id = "innerContainer" class = "row-fluid">
	</div>
	<div id = "newFlightContainer" class = "row-fluid">
	</div>
	<div id = "changeBut" class = "row-fluid">
		<button id = "changeFlightButton" type = "button" class = "btn btn-primary"
		data-toggle = "modal" data-target = "#changeFlightDetails" value = "Change Flight Time">Change Flight Time</button>
	</div>
</div>
<!-- Modal -->
<div class="modal fade" id="changeFlightDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel">Enter Details</h4>
			</div>
			<div id="formDiv" class="modal-body container">
				<form id = "flightDetails">
					<fieldset>
						<label>Flight Number: </label>
						<input type="text" id="flightNum" required/>
						<br/><br/>
						<label>Departure Details: </label>
						<input type="datetime" id="oldDepDate" required />
						<br/><br/>
						<label>New Departure Details: </label>
						<input type="datetime" id = "newDepDate" required/>
						<br/>
						<input type = "submit" value = "Change Time" class="btn btn-primary" id = "changeSubmitButton"/>
					</fieldset>	
				</form>
			</div>
			<div id = "changePane" class = "modal-body container">
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<script type = "text/javascript" src = "js/adminPage.js"></script>