<?php
require_once 'connection.php';

// Check for connection errors
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Read JSON input
$postData = json_decode(file_get_contents("php://input"), true);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
    exit();
}

// Input values
$clientId = $postData['clientId'] ?? null;
$changeOrder = $postData['changeOrder'] ?? null;
$refNo = $postData['refNo'] ?? null;
$changeType = $postData['changeType'] ?? null;
$changeDetails = $postData['changeDetails'] ?? null;
$otherChangeDetails = $postData['otherChangeDetails'] ?? null; 
$priority = isset($postData['priority']) ? (int)$postData['priority'] : null;
$mandays = isset($postData['mandays']) ? (int)$postData['mandays'] : null;
$deliveryDate = $postData['deliveryDate'] ?? null;
$comment = $postData['comment'] ?? null;
$userId = $postData['userId'] ?? null;
$fileId = isset($postData['fileId']) ? (int)$postData['fileId'] : null;
$userChange = $postData['UserChange'] ?? null;

// Use otherChangeDetails for changeType if not null
if (!empty($otherChangeDetails)) {
    $changeType = $otherChangeDetails;
}


$conn->query("SET @userChange = '$userChange'");

// Function to check if `changeOrder` already exists
function isDuplicateChangeOrder($conn, $changeOrder) {
    $query = "SELECT COUNT(*) AS count FROM t_change_order WHERE ChangeOrder = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $changeOrder);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();
    return $row['count'] > 0;
}

// Function to check if `refNumber` already exists
function isDuplicateRefNumber($conn, $refNo) {
    $query = "SELECT COUNT(*) AS count FROM t_change_order WHERE RefNumber = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $refNo);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();
    return $row['count'] > 0;
}

// Check for duplicate `changeOrder`
if (isDuplicateChangeOrder($conn, $changeOrder)) {
    echo json_encode(["status" => "error", "message" => "Duplicate record found for changeOrder"]);
    exit();
}

// Check for duplicate `refNumber`
if (isDuplicateRefNumber($conn, $refNo)) {
    echo json_encode(["status" => "error", "message" => "Duplicate record found for refNumber"]);
    exit();
}

// Call the stored procedure
$stmt = $conn->prepare("CALL InsertChangeOrder(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param(
    "sssssiisssi", 
    $clientId, 
    $changeOrder, 
    $refNo, 
    $changeType, 
    $changeDetails, 
    $priority, 
    $mandays, 
    $deliveryDate, 
    $comment, 
    $userId, 
    $fileId
);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Record inserted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
?>
