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

$sql = "SELECT 
            co.ChangeOrder, 
            co.RefNumber, 
            co.ChangeType, 
            co.ChangeDetails, 
            co.Priority, 
            co.Mandays, 
            co.DeliveryDate, 
            co.Comment, 
            co.UserId, 
            co.StatusProgress, 
            co.FileId,
            co.ClientId,
            mc.ClientName,
            mc.Address,
            mc.OnCloud,
            mc.Hybrid,
            mc.CloudName,
            CONCAT_WS(', ', 
                mc.Address, 
                mc.SubDistrictId, 
                mc.DistrictId, 
                mc.CityId, 
                mc.ProvinceId, 
                mc.CountryId
            ) AS FullAddress,
            f.FilePath,
            tu.Name AS UserName
        FROM 
            t_change_order AS co
        INNER JOIN 
            t_master_client AS mc ON co.ClientId = mc.ClientId
        LEFT JOIN 
            filepath AS f ON co.FileId = f.FileId
        LEFT JOIN 
            t_master_username AS tu ON co.UserId = tu.UserId
        WHERE 
            co.ChangeOrder = ?";


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