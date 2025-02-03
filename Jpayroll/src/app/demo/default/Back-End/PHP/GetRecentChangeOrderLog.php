<?php
require_once 'connection.php';

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT 
    log.LogId, 
    log.ChangeOrder, 
    log.UserId, 
    CASE 
        WHEN log.Altered = '' THEN 'DELETE' 
        ELSE log.Altered 
    END AS Altered, 
    log.ChangeDate, 
    user.Name AS UserName
FROM 
    t_change_order_log log
JOIN 
    t_master_username user
ON 
    log.UserId = user.UserId
ORDER BY 
    log.ChangeDate DESC
LIMIT 5;
";


        
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
}

echo json_encode($data);

$conn->close();
?>
