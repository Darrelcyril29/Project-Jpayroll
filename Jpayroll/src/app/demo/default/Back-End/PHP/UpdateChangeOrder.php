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

$changeOrder = $postData['changeOrder'] ?? null;
$changeType = $postData['changeType'] ?? null;
$changeDetails = $postData['changeDetails'] ?? null;
$priority = isset($postData['priority']) ? (int)$postData['priority'] : null;
$mandays = isset($postData['mandays']) ? (int)$postData['mandays'] : null;
$deliveryDate = $postData['deliveryDate'] ?? null;
$comment = $postData['comment'] ?? null;
$userId = $postData['userId'] ?? null;
$fileId = (int) $postData['fileId'];
$statusProgress = $postData['statusProgress'] ?? null;

$userChange = $postData['UserChange'] ?? null;

$fileId = $postData['fileId'];
if (empty($fileId)) {
    echo json_encode(["status" => "error", "message" => "FileId is missing"]);
    exit();
}


$conn->query("SET @userChange = '$userChange'");

// Call stored procedure
$stmt = $conn->prepare("CALL UpdateChangeOrder(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param(
    "sssiisssii",
    $changeOrder,
    $changeType,
    $changeDetails,
    $priority,
    $mandays,
    $deliveryDate,
    $comment,
    $userId,
    $statusProgress,
    $fileId
);


if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Change order updated successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
?>
