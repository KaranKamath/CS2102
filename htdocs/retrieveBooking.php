<?php 
require "connect.php";

$formData = json_decode($_POST["pnr"], true);

$table_name = "booking";
$column_name = "pnr";
$pnr = $formData;

$queryResult =  mysqli_query($con, "SELECT DISTINCT* FROM $table_name b, flight f WHERE f.flight_no = b.flight_no and f.departure_details = b.departure_details and 
	b.pnr = '$pnr'") or die("query died");

$resultArray = array();


while($row = mysqli_fetch_array($queryResult))
{
	array_push($resultArray, $row);
}

echo json_encode($resultArray);

?>