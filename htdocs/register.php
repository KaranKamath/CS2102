<?php
include_once('./connect.php');
if(isset($_POST['username'])) {
	$username = preg_replace('#[^a-z0-9]#i', '', $_POST['username']);
	$password = $_POST['password'];
	$passwordConfirm = $_POST['passwordConfirm'];

	if(trim($username) == '' || trim($password) == '' ||
		trim($passwordConfirm) == '') {
		echo "Error: All fields required.";
		$db = null;
		exit();
	}

	else if($password != $passwordConfirm) {
		$db = null;
		exit("Passwords do not match");
	}

	$hmac = hash_hmac('sha512', $password, file_get_contents('./key.txt'));

	$bytes = mcrypt_create_iv(16, MCRYPT_DEV_URANDOM);

	$salt = strstr(base64_encode($bytes), '+', '.');

	$salt = substr($salt, 0, 22);

	$bcrypt = crypt($hmac, '$2y$12$', $salt);
}
?>
<html>
<head>
	<title> Registration for new user/admin</title>
</head>
<body>
	<div>
		<h2>Register:<br/> </h2>
		<form method = "post" action = "">
			<label for = "username"><strong>Username: </strong> </label>
			<input type = "text" name = "username"> <br/>
			<label for = "password"><strong>Password: </strong></label>
			<input type = "password" name = "password"> <br/>
			<label for = "passwordConfirm"><strong>Confirm Password: </strong></label>
			<input type = "password" name = "passwordConfirm"><br/>
			<button type = "submit">Create Account</button>
		</form>
	</div>
</body>
</html>