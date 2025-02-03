<?php
require_once 'connection.php';

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT 
        mc.ClientId,
        mc.ClientName,
         CONCAT(CountryId, ', ', ProvinceId, ', ', CityId, ', ', DistrictId, ', ', SubDistrictId) AS FullAddress,
        CASE 
            WHEN mc.OnCloud = 1 THEN 'Cloud' 
            ELSE 'On Premise' 
        END AS OnPremise,
        CASE 
            WHEN mc.Hybrid = 1 THEN 'Hybrid' 
            ELSE 'No' 
        END AS HybridStatus,
        mc.CloudName
    FROM 
        t_master_client AS mc";
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
