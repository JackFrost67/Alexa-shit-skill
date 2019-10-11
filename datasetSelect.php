<?php        
	 	$pwd = 'password.php';
        
        //sostituisci mysqldb con quello che c'è scritto su w3c
        $db = new mysqli('localhost', 'alexaskilldb', $pwd, 'my_alexaskilldb');

        $sql= "SELECT `date`, `time`, `location`, `operator`, `type`, `summary` FROM `TABLE 1` ORDER BY RAND () LIMIT 1 ";        
        $result = mysqli_query($db, $sql);
        
        while($row = mysqli_fetch_assoc($result))
 
		echo json_encode($row);
        
?>        



