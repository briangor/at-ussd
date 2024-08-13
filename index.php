<?php
// reads the variables sent via POST from AT gateway
$sessionId = $_POST["sessionId"];
$serviceCode = $_POST["serviceCode"];
$phoneNumber = $_POST["phoneNumber"];
$text = $_POST["text"];

if ($text == "") {
    // this is the first request > Note how we start the response with CON
    $response = "CON What would you want to checkk \n";
    $response .= "1. My Account No \n";
    $response .= "2. My Phone Number \n";
} else if ($text == "1") {
    // Business logic for the first level response
    $response = "CON Choose account information you want to view \n";
    $response .= "1. Account Number \n";
    $response .= "2. Account Balance \n";
} else if ($text == "2") {
    // Business logic for the first level response
    // This is a terminal request. Note how we start with END.
    $response = "END Your phone number is ".$phoneNumber;
} else if ($text == "1*1") {
    // This is a second level response where the user selected 1 in the first instance
    $accountNumber = "ACC1001";

    // This is a terminal request 
    $response = "END Your account number is ".$accountNumber;
} else if ($text == "1*2") {
    $balance = "KES 10,000";

    $response = "END Your balance is ".$balance;
}

header('Content-type: text/plain');
echo $response;
?>