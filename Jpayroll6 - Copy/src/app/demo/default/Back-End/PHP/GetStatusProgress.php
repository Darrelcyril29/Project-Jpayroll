<?php
require_once 'connection.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT 
            SUM(StatusProgress = 1) AS OnPending,
            SUM(StatusProgress = 2) AS OnProgress,
            SUM(StatusProgress = 3) AS Completed
        FROM t_change_order";

$result = $conn->query($sql);

$AnalyticEcommerce = array();

if ($result->num_rows > 0) {
    // Fetch data
    while($row = $result->fetch_assoc()) {
        $AnalyticEcommerce[] = array("title" => "On Pending", "amount" => $row["OnPending"], "border" => "border-primary");
        $AnalyticEcommerce[] = array("title" => "On Progress", "amount" => $row["OnProgress"], "border" => "border-primary");
        $AnalyticEcommerce[] = array("title" => "Completed", "amount" => $row["Completed"], "border" => "border-warning");
    }
}

$conn->close();

echo json_encode($AnalyticEcommerce);
?>