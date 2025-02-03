<?php
require_once 'connection.php';
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  
  $sql = "SELECT *
          FROM T_Province";
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