<?php 
require "connect.php";

$bookData = json_decode($_POST["data"], true);
$booking_table = "booking";
$flight_table = "flight";
$seat_table = "seat";
$flight_no = $bookData["flightNo"];
$class = $bookData["seatClass"];
$depDate = $bookData["departureTime"];
$numSeats = $bookData["numSeats"];
$email = $bookData["email"];
$contact = $bookData["contact"];
$passName = $bookData["name"];
$dieString = "<h2>Oops! An Error Occurred</h2>";

$md5_hash = md5(rand() + "$email + $passName + $contact + $flight_table + $flight_no + $class + $depDate + $numSeats" + rand() + rand());
$bits = substr($md5_hash, 0, 6); // 40 bits (10 hex digits of 4 bits each) is enough for a 10 digit decimal number
$decimal = base_convert($bits, 16, 10); // Convert from hexadecimal (base 16) to decimal
$ten_digits = substr($decimal, 0, 6); 
$padded_result = str_pad($ten_digits, 6, '0', STR_PAD_LEFT); // Pad the resulting number to 6 digits, just in case

$result = $decrementSeatsQuery = mysqli_query($con, "UPDATE $seat_table SET available_seats = available_seats - $numSeats WHERE seat_class = '$class' and flight_no = '$flight_no' and departure_details = '$depDate'
	and (available_seats - $numSeats) >= 0") or die($dieString);

if(mysqli_affected_rows($con) <=  0) {
	echo ("<h2> Too Many Seats Selected </h2>");
}

else {
	$bookQuery = mysqli_query($con, "INSERT INTO $booking_table values('$padded_result',
		'$passName', '$contact', '$email', '$class', '$numSeats', '$flight_no',
		'$depDate');") or die($dieString);

	echo("<h2>Booking Made:</h2><br/><p>PNR: $padded_result<br/>".
		"Flight Number: $flight_no <br/> Seat Class: $class <br/>Departure Details: $depDate".
		"<br/>Seats Selected: $numSeats<br/>Passenger Name: $passName<br/>".
		"Email: $email<br/>Contact Number: $contact</p>");
}
?>