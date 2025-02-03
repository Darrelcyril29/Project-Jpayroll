<?php
require_once 'connection.php';

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

$postData = json_decode(file_get_contents("php://input"), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
    exit();
}

$changeLogId = $postData['ChangeLogId'] ?? null;

$sql = "
    SELECT 
        ChangeLogId,
        ChangeOrder,
        Title,
        UserId,
        FileId,
        Comment,
        UploadDate
    FROM 
        t_change_log
    WHERE 
        ChangeLogId = ?";

$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die(json_encode(["error" => "SQL Prepare Failed: " . $conn->error]));
}

// Bind parameter and execute query
$stmt->bind_param("i", $changeLogId);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode(["message" => "No ChangeLog found with the provided ChangeLogId"]);
}

// Close connections
$stmt->close();
$conn->close();
?>
