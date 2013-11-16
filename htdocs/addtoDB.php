<?php 
require "connect.php";

echo $_POST["id"] . " " . $_POST["pass"] . "\t";

$uid = $_POST["id"];
$pass = $_POST["pass"];

$result = mysqli_query($con,"INSERT INTO $table_name (uid, password)
	VALUES ('$uid', '$pass')");
if($result) {
   header( 'Location: http://localhost:8080/front.php');
}
else {
	echo "Failed";
}

mysqli_close($con);
?>