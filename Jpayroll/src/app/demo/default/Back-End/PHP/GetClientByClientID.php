<?php
require_once 'connection.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$postData = json_decode(file_get_contents("php://input"), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
    exit();
}

$clientId = $postData['clientId'] ?? null;

if (!$clientId) {
    echo json_encode(["status" => "error", "message" => "Missing clientId parameter"]);
    exit();
}

$sql = "SELECT * FROM t_master_client WHERE ClientId = ?;";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $clientId);
if ($stmt->execute()) {
    $result = $stmt->get_result();
    $data = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode(["status" => "success", "data" => $data]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

$conn->close();
?>
