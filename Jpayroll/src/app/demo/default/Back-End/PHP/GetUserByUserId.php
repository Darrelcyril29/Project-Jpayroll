<?php
require_once 'connection.php';

$postData = json_decode(file_get_contents("php://input"), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
    exit();
}

$UserId = $postData['UserID'] ?? null;

  $sql = "SELECT UserId, Name, Usertype, InactiveDate, Email
          FROM t_master_username
          where UserId = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $UserId); 

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $data = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode(["status" => "success", "data" => $data]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>