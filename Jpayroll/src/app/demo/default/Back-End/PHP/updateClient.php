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

$clientId = $postData['clientId'] ?? null; 
$clientName = $postData['clientName'] ?? null; 
$countryId = $postData['countryId'] ?? null; 
$provinceId = $postData['provinceId'] ?? null; 
$cityId = $postData['cityId'] ?? null; 
$districtId = $postData['districtId'] ?? null; 
$subDistrictId = $postData['subDistrictId'] ?? null; 
$postalCode = $postData['postalCode'] ?? null;
$address = $postData['address'] ?? null;
$onCloud = isset($postData['onCloud']) ? (int)$postData['onCloud'] : null;
$hybrid = isset($postData['hybrid']) ? (int)$postData['hybrid'] : null; 
$cloudName = $postData['cloudName'] ?? null; 


if (!$clientId) {
    echo json_encode(["status" => "error", "message" => "Client ID is required"]);
    exit();
}

$stmt = $conn->prepare("CALL UpdateClient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param(
    "sssssssssiis",
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

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Client updated successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
?>
