<?php
require "connect.php";

$formData = json_decode($_POST["data"], true);

$table_name = "flight";
$column_name = "carrier_name";
$from = $formData["from"];
$to = $formData["to"];
$date = $formData["depDate"];
$dateStart = $date." 00:00:00";
$dateEnd = $date."23:59:59";

$queryResult =  mysqli_query($con, "SELECT DISTINCT
	$column_name FROM $table_name WHERE departure_destination = '$from' AND arrival_destination = '$to' AND departure_details >= '$dateStart'
	AND departure_details < '$dateEnd'") or die("query died");

$resultArray = array();

while($row = mysqli_fetch_array($queryResult))
{
	array_push($resultArray, $row[0]);
}

echo json_encode($resultArray);

?>