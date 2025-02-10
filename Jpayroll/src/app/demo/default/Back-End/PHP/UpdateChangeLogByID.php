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
$changeLogId = isset($postData['changeLogId']) ? (int)$postData['changeLogId'] : null;
$comment = $postData['comment'] ?? null;
$fileId = isset($postData['fileId']) ? (int)$postData['fileId'] : null;
$title = $postData['title'] ?? null;
$userId = $postData['userId'] ?? null;
$verified = isset($postData['verified']) ? (int)$postData['verified'] : null;

// Prepare the stored procedure call
$stmt = $conn->prepare("CALL UpdateChangeLogById(?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Failed to prepare statement: " . $conn->error]);
    exit();
}

// Bind parameters
$stmt->bind_param(
    "issisi",
    $changeLogId,
    $title,
    $userId,
    $fileId,
    $comment,
    $verified
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
