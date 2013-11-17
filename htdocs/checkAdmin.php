<?php
require "connect.php";

$data = json_decode($_POST["credentials"], true);

$admin_table = "admin";

$aid = $data["adminName"];
$apass = $data["adminPass"];

$findAdminQuery = mysqli_query($con, "SELECT EXISTS (SELECT admin_id FROM $admin_table WHERE admin_id = '$aid' 
	AND admin_password = '$apass')") or die("Find Admin Failed.");
$result = mysqli_fetch_row($findAdminQuery);

if($result[0] == 1) {
	echo "true";
} else {
	echo "false";
}
?>