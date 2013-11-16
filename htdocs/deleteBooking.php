<?php
require "connect.php";

$data = json_decode($_POST["data"], true);

$booking_table = "booking";
$seat_table = "seat";
$column_name = "pnr";

$pnr = $data["pnr"];
$flightNum = $data["flight"];
$seatClass = $data["seatClass"];
$depDetails = $data["depDetails"];
$numSeats = $data["numPeople"];

$updateSeatQuery = mysqli_query($con, "UPDATE $seat_table SET available_seats = available_seats + $numSeats WHERE seat_class = '$seatClass' and flight_no = '$flightNum' 
	and departure_details = '$depDetails'") or die("Seat Update Failed.");
if(mysqli_affected_rows($con) > 0) {
	$deleteBookingQuery = mysqli_query($con, "DELETE FROM $booking_table WHERE pnr = '$pnr'");

	if(mysqli_affected_rows($con) > 0) {
		echo "<p class = 'text-success'>Booking Deleted</p>";
	} else {
		echo "<p class = 'text-danger'>Failed to Delete Booking</p>";
	}
} else {
	echo "<p class = 'text-danger'>Failed to Update Seat</p>";
}
?>