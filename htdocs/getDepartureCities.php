<?php
require "connect.php";

$table_name = "flight";

$column_name = "departure_destination";

$queryResult =  mysqli_query($con, "SELECT DISTINCT
$column_name FROM $table_name") or die("query died");

$resultArray = array();

while($row = mysqli_fetch_array($queryResult))
{
	array_push($resultArray, $row[0]);
}

echo json_encode($resultArray);

?>