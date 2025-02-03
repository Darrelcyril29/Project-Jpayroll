<?php
require_once 'connection.php';

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

$query = "
    SELECT 
        co.ChangeOrder,
        co.RefNumber,
        co.ChangeType,
        CASE co.StatusProgress
            WHEN 1 THEN 'On Pending'
            WHEN 2 THEN 'On Progress'
            WHEN 3 THEN 'Completed'
            ELSE 'Unknown'
        END AS StatusProgress,
        mc.ClientName
    FROM 
        t_change_order AS co
    JOIN 
        t_master_client AS mc ON co.ClientId = mc.ClientId
    WHERE 
        co.ClientId = ?";

$stmt = $conn->prepare($query);
$stmt->bind_param("s", $clientId); 
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
