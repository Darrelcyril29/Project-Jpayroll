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
$clientId = $postData['clientId'] ?? null;
$clientName = $postData['clientName'] ?? null;
$countryId = $postData['countryId'] ?? null;
$provinceId = $postData['provinceId'] ?? null;
$cityId = $postData['cityId'] ?? null;
$districtId = $postData['districtId'] ?? null;
$subDistrictId = $postData['subDistrictId'] ?? null;
$postalCode = isset($postData['postalCode']) ? (int)$postData['postalCode'] : null;
$address = $postData['address'] ?? null;
$onCloud = isset($postData['onCloud']) ? (int)$postData['onCloud'] : null;
$hybrid = isset($postData['hybrid']) ? (int)$postData['hybrid'] : null;
$cloudName = $postData['cloudName'] ?? null;

// Validate required fields
if (!$clientId || !$clientName || !$countryId) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit();
}

// Prepare the stored procedure call
$stmt = $conn->prepare("CALL InsertClient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Failed to prepare statement: " . $conn->error]);
    exit();
}

// Bind parameters
$stmt->bind_param(
    "sssssssisiis",
    $clientId,
    $clientName,
    $countryId,
    $provinceId,
    $cityId,
    $districtId,
    $subDistrictId,
    $postalCode,
    $address,
    $onCloud,
    $hybrid,
    $cloudName
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
