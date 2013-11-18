<?php
require "connect.php";

$data = json_decode($_POST["data"], true);

$flight_table = "flight";

$f_no = $data["flightNo"];
$o_dep_date = $data["oldDetails"];
$n_dep_date = $data["newDetails"];

$updateSeatQuery = mysqli_query($con, "UPDATE $flight_table SET departure_details = '$n_dep_date' 
	WHERE departure_details = '$o_dep_date'") or die("Flight Update Failed.");
if(mysqli_affected_rows($con) > 0) {
	echo "Flight Details Updated";
} else {
	echo "Incorrect input, check details";
}
?>