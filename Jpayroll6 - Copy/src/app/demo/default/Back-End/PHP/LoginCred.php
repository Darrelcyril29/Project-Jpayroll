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
$password = $postData['password'] ?? null;

if (!$email || !$password) {
    echo json_encode(["status" => "error", "message" => "Missing email or password"]);
    exit();
}

// Call the stored procedure
$sql = "CALL CheckUserCredentials(?, ?, @UserId, @Usertype, @Name, @InactiveDate)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $password);

if ($stmt->execute()) {
    // Fetch the output parameters
    $result = $conn->query("SELECT @UserId AS UserId, @Usertype AS Usertype, @Name AS Name, @InactiveDate AS InactiveDate");
    $output = $result->fetch_assoc();
    if ($output['UserId']) {
        if ($output['InactiveDate'] < date('Y-m-d')) {
            echo json_encode(["status" => "error", "message" => "Access denied. Account is inactive today."]);
        } else {
            echo json_encode([
                "status" => "success",
                "data" => [
                    "UserId" => $output['UserId'],
                    "Usertype" => $output['Usertype'],
                    "Name" => $output['Name']
                ]
            ]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
