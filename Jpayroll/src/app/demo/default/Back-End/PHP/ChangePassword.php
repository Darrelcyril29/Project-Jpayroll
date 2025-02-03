<?php
require_once 'connection.php';

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Read JSON input
$postData = json_decode(file_get_contents("php://input"), true);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON input"]);
    exit();
}

// Extract parameters from the JSON input
$userId = $postData['userId'] ?? null;
$OldPassword = $postData['OldPassword'] ?? null;
$NewPassword = $postData['Newpassword'] ?? null;

if (!$userId || !$OldPassword || !$NewPassword) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit();
}

// Validate the OldPassword
$sql = "SELECT Password FROM t_master_username WHERE UserId = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Failed to prepare statement: " . $conn->error]);
    exit();
}

// Bind parameters and execute
$stmt->bind_param("s", $userId);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if ($row) {
    // Verify if the OldPassword matches
    if ($row['Password'] === $OldPassword) { // Replace with password_verify if using hashed passwords
        // Update the password
        $updateSql = "UPDATE t_master_username SET Password = ? WHERE UserId = ?";
        $updateStmt = $conn->prepare($updateSql);

        if ($updateStmt) {
            $updateStmt->bind_param("ss", $NewPassword, $userId);
            if ($updateStmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Password updated successfully."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to update password: " . $updateStmt->error]);
            }
            $updateStmt->close();
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to prepare update statement: " . $conn->error]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid current password."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid UserId."]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
