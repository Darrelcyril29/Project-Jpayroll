<?php
require_once 'connection.php';

// Directory to store uploaded files
$targetDir = "uploads/";

// Ensure the uploads directory exists
if (!is_dir($targetDir)) {
    if (!mkdir($targetDir, 0777, true)) {
        echo json_encode(["status" => "error", "message" => "Failed to create upload directory."]);
        exit();
    }
}

// Get the uploaded file
$file = $_FILES['file'];

if (empty($file)) {
    echo json_encode(["status" => "error", "message" => "Please Upload a file"]);
    exit();
}

if ($file['error'] == UPLOAD_ERR_OK) {
    // Generate a unique file path
    $targetFilePath = $targetDir . uniqid() . '_' . basename($file["name"]);

    // Move the uploaded file to the target directory
    if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
        // Connect to the database
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            echo json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]);
            exit();
        }

        // Prepare and execute the SQL statement to insert the file path
        $stmt = $conn->prepare("INSERT INTO filepath (FilePath) VALUES (?)");
        $stmt->bind_param("s", $targetFilePath);

        if ($stmt->execute()) {
            // Get the inserted FileId
            $fileId = $stmt->insert_id;

            // Return success response with FileId and file path
            echo json_encode([
                "status" => "success",
                "fileId" => $fileId,
                "filePath" => $targetFilePath
            ]);
        } else {
            // Handle SQL execution error
            echo json_encode(["status" => "error", "message" => "Failed to insert file path into the database."]);
        }

        // Close statement and connection
        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(["status" => "error", "message" => "There was an error moving the file."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "File upload failed."]);
}
?>
