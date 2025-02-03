<?php
require_once 'connection.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "
    SELECT 
        tco.ClientId,
        tmc.ClientName,
        tco.ChangeOrder,
        tco.RefNumber,
        tmc.Address,
        tco.ChangeType,
        tco.ChangeDetails,
        
        CASE tco.Priority
            WHEN 1 THEN 'High'
            WHEN 2 THEN 'Moderate'
            WHEN 3 THEN 'Low'
            ELSE 'Unknown'
        END AS Priority,
        
        tco.Mandays,
        tco.DeliveryDate,
        tco.Comment,
        tco.UserId,
        tmu.Name AS UserName,
        
        CASE tco.StatusProgress
            WHEN 1 THEN 'On Pending'
            WHEN 2 THEN 'On Progress'
            WHEN 3 THEN 'Completed'
            ELSE 'Unknown'
        END AS StatusProgress
        
    FROM 
        t_change_order tco
    JOIN 
        t_master_client tmc ON tco.ClientId = tmc.ClientId
    JOIN 
        t_master_username tmu ON tco.UserId = tmu.UserId
    WHERE 
        tco.StatusChangeOrder = 1
    ORDER BY 
        tco.AddedDate DESC, Priority ASC, StatusProgress DESC;
";

$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}


echo json_encode($data);

$conn->close();
?>
