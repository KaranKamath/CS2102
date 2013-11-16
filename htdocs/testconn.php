<?php 
require "connect.php";

$name = "Singapore";
$password = "Mumbai";

$resArray = array();

$result =  mysqli_query($con, "SELECT * FROM $table_name WHERE uid = '$name' and password = '$password'; ") or die("query died");

while($row = mysqli_fetch_array($result)) {
	array_push($resArray, $row);
	echo $row['uid'] . " " . $row['password'];
	echo "<br>";
}

echo json_encode($resArray);
?>