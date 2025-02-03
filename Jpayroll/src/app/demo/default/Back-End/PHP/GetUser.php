<?php
require_once 'connection.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Define the mapping of values to labels
$userTypeLabels = [
    0 => 'Admin',
    1 => 'Client Level 1',
    2 => 'Client Level 2',
    11 => 'Agent Level 1',
    12 => 'Agent Level 2',
    21 => 'R&D Level 1',
    22 => 'R&D Level 2',
    98 => 'Accounting Admin',
    99 => 'SuperUser'
];

$sql = "SELECT 
    UserId, 
    Name, 
    Usertype, 
    InactiveDate,
    CASE 
        WHEN InactiveDate IS NOT NULL AND InactiveDate <= CURDATE() THEN 'Deactive'
        ELSE 'Active'
    END AS AccountStatus
FROM t_master_username;
";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Map Usertype value to label
        $row['Usertype'] = $userTypeLabels[$row['Usertype']] ?? 'Unknown'; // Fallback to 'Unknown' if not found
        $data[] = $row;
    }
}

echo json_encode($data);

$conn->close();
?>
