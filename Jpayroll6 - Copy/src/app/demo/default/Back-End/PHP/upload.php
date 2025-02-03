<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');
$targetDir = "uploads/"; 

// Ensure the uploads directory exists
if (!is_dir($targetDir)) {
    if (!mkdir($targetDir, 0777, true)) {
        echo json_encode(["status" => "error", "message" => "Failed to create upload directory."]);
        exit();
    }
}

$file = $_FILES['file'];

if ($file['error'] == UPLOAD_ERR_OK) {
    $targetFilePath = $targetDir . uniqid() . '_' . basename($file["name"]);

    if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
        echo json_encode(["status" => "success", "filePath" => $targetFilePath]);
    } else {
        echo json_encode(["status" => "error", "message" => "There was an error moving the file."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "File upload failed."]);
}

?>
