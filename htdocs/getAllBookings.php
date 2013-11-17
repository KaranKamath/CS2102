<?php
require "connect.php";

$bookingsQuery = mysqli_query($con, "SELECT * FROM booking b, flight f WHERE b.flight_no = f.flight_no
	AND b.departure_details = f.departure_details");

$resultsArray = array();

while($row = mysqli_fetch_array($bookingsQuery)) {
	array_push($resultsArray, $row);
}

echo json_encode($resultsArray)
?>