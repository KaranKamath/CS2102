<?php 
require "connect.php";

$formData = json_decode($_POST["data"], true);

$flight_table = "flight";
$seat_table = "seat";
$from = $formData["from"];
$to = $formData["to"];
$class = $formData["seatClass"];
$date = $formData["depDate"];
$dateStart = $date .' 00:00:00';
$dateEnd = $date .' 23:59:59';

$numPeople = $formData["numPeople"];

$queryResult = mysqli_query($con, "SELECT * FROM $flight_table f, $seat_table sOuter 
	WHERE f.flight_no = sOuter.flight_no AND sOuter.seat_class = '$class' AND f.flight_no IN 
	(
		SELECT flight_no FROM $seat_table s WHERE s.available_seats >= $numPeople
		AND s.seat_class = '$class' AND s.flight_no IN 
		(
			SELECT DISTINCT flight_no FROM flight g 
				WHERE g.departure_destination = '$from' AND g.arrival_destination = '$to'
				AND g.departure_details >= '$dateStart' AND g.departure_details < '$dateEnd'
			)
		);") or die("An error occured");

$resultJSON = array();

while($row = mysqli_fetch_array($queryResult))
{
	array_push($resultJSON, $row);
}
	echo json_encode($resultJSON);

?>