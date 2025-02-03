<?php
require_once 'connection.php';

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Retrieve POST data
$postData = json_decode(file_get_contents("php://input"), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
    exit();
}

$email = $postData['email'] ?? null;
$newPassword = $postData['newPassword'] ?? null;

if (!$email || !$newPassword) {
    echo json_encode(["status" => "error", "message" => "Missing email or new password"]);
    exit();
}

// Update the password in the database
$sql = "UPDATE t_master_username SET Password = ? WHERE Email = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("ss", $newPassword, $email);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["status" => "success", "message" => "Password updated successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "No user found with the provided email"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Error updating password: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Error preparing statement: " . $conn->error]);
}

$conn->close();
?>
