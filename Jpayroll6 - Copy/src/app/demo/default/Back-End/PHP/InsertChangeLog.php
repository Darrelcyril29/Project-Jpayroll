<?php
require_once 'connection.php';

$postData = json_decode(file_get_contents("php://input"), true);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
    exit();
}

$title = $postData['title'] ?? null;
$comment = $postData['comment'] ?? null;
$filePath = $postData['filePath'] ?? null;
$changeOrder = $postData['changeOrder'] ?? null;
$userId = $postData['userId'] ?? null;

if (is_null($title) || is_null($changeOrder)) {
    echo json_encode(["status" => "error", "message" => "Error: Required fields are missing."]);
    exit();
}

$stmt = $conn->prepare("CALL InsertChangeLog(?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", 
    $title, 
    $comment, 
    $filePath,
    $changeOrder,
    $userId 
);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Change log inserted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
