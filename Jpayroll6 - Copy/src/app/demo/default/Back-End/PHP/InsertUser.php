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
$password = $postData['Password'] ?? null;
$userType = isset($postData['UserType']) ? (int)$postData['UserType'] : null;
$inactiveDate = $postData['InactiveDate'] ?? null;

// Validate required fields
if (!$userId || !$email || !$name || !$password || $userType === null || !$inactiveDate) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit();
}

// Check if email already exists
$checkStmt = $conn->prepare("SELECT COUNT(*) AS count FROM t_master_username WHERE Email = ?");
if (!$checkStmt) {
    echo json_encode(["status" => "error", "message" => "Failed to prepare statement: " . $conn->error]);
    exit();
}

$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$result = $checkStmt->get_result();
$row = $result->fetch_assoc();
$checkStmt->close();

if ($row['count'] > 0) {
    echo json_encode(["status" => "error", "message" => "Email already exists"]);
    exit();
}

// Prepare the stored procedure call
$stmt = $conn->prepare("CALL InsertMasterUsername(?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Failed to prepare statement: " . $conn->error]);
    exit();
}

// Bind parameters
$stmt->bind_param(
    "ssssis",
    $userId,
    $email,
    $name,
    $password,
    $userType,
    $inactiveDate
);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Record inserted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: cannot execute"]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
