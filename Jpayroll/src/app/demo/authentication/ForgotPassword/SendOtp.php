<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Include PHPMailer files manually
require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Log the POST data to confirm it's being received
file_put_contents('php://stderr', print_r($_POST, true));  // Logs to PHP error log

if (!isset($_POST['email'])) {
    // Return a JSON response with an error message if email is missing
    echo json_encode(['status' => 'error', 'message' => 'Provide an email address in the POST request.']);
    exit();
}

// Now it's safe to access the email parameter
$email = $_POST['email'];

// Generate a 6-digit OTP
$otp = rand(100000, 999999);

$mail = new PHPMailer(true);

try {
    // SMTP server configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Replace with your email service SMTP
    $mail->SMTPAuth = true;
    $mail->Username = 'sneakereverse@gmail.com'; // Replace with your email
    $mail->Password = 'eqns tqff nott xsgy'; // Replace with your app password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Email configuration
    $mail->setFrom('sneakereverse@gmail.com', 'Your Service Name');
    $mail->addAddress($email);
    $mail->isHTML(false);
    $mail->Subject = 'Your OTP for Password Reset';
    $mail->Body = "Your OTP is: $otp";

    // Send the email
    $mail->send();
    // Return success response with OTP
    echo json_encode(['status' => 'success', 'otp' => $otp]);
} catch (Exception $e) {
    // Return error response if mail fails
    echo json_encode(['status' => 'error', 'message' => "Mailer Error: {$mail->ErrorInfo}"]);
}

?>
