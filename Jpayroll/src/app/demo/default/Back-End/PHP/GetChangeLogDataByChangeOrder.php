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

$changeOrder = $postData['ChangeOrder'] ?? null;

if (!$changeOrder) {
    echo json_encode(["status" => "error", "message" => "Missing ChangeOrder parameter"]);
    exit();
}

$sql = "SELECT 
            cl.ChangeLogId,
            cl.Title,
            cl.Comment,
            fp.FilePath,
            cl.UploadDate,
            u.Name AS UserName
        FROM 
            t_change_log cl
        JOIN 
            filepath fp ON cl.FileId = fp.FileId
        LEFT JOIN
            t_master_username u ON cl.UserId = u.UserId
        WHERE 
            cl.ChangeOrder = ? AND cl.ChangeLogStatus = 1";


$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $changeOrder);

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
