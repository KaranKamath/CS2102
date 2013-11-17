<?php include 'base.html'; ?>
<div id = "outerContainer" class = "container">
	<form id = "adminLogInForm" class = "pull left">
	</form>
	<div id = "innerContainer" class = "row-fluid">
	</div>
	<div id = "newFlightContainer" class = "row-fluid">
	</div>
</div>
<!-- Modal -->
<div class="modal fade" id="addFlightModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel">Enter Details</h4>
			</div>
			<div id="formDiv" class="modal-body container">
				<form id = "flightDetails">
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
<script type = "text/javascript" src = "js/adminPage.js"></script>