<?php
include 'conn.php';
$data = [];
$sql = "SELECT *  FROM `discussion` ";
$result = $conn->query($sql);

// while ($row = $result->fetch()) {
//         array_push($data, $row);
//         //array_push($data);
// }

foreach ($result as $row) {
        array_push($data, $row);
}

//  echo'<pre>';
//  print_r($data);
//  die("Terminado");


echo json_encode($data);
$conn = null;
exit();
