<?php
require_once 'connection.php';

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Read JSON input
$postData = json_decode(file_get_contents("php://input"), true);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON input"]);
    exit();
}


// Extract parameters from the JSON input
$userId = $postData['userId'] ?? null;
$email = $postData['Email'] ?? null;
$name = $postData['Name'] ?? null;
$userType = isset($postData['UserType']) ? (int)$postData['UserType'] : null;
$inactiveDate = $postData['InactiveDate'] ?? null;

// Prepare the stored procedure call
$stmt = $conn->prepare("CALL UpdateUserDetails(?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Failed to prepare statement: " . $conn->error]);
    exit();
}

// Bind parameters
$stmt->bind_param(
    "sssis",
    $userId,
    $email,
    $name,
    $userType,
    $inactiveDate
);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Record inserted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
