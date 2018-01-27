<?php 
	require_once 'consql.php';
	$data = file_get_contents("php://input");
	class setCon extends Conmysql{
		public function __construct($servername,$username,$password, $dbname){
			parent::__construct($servername,$username,$password, $dbname);
		}
		public function setCourse(){
			if ($this->con==null) {
    			$this->getConnection();
    		}
    		global $data;
			$OBJ = json_decode($data);
    		$createDate = $OBJ->{'createDate'};
    		$onLineStu = $OBJ->{'onLineStu'};
    		$totalStu = $OBJ->{'totalStu'};
    		$courseCode = $OBJ->{'courseCode'};
			$sql = "INSERT INTO `t_coursesdata` (`createDate`, `onLineStu`, `totalStu`, `courseCode`) VALUES (:createDate, :onLineStu, :totalStu, :courseCode)";
			$statement=$this->con->prepare($sql);
    		$statement->execute(array(':createDate'=>$createDate, ':onLineStu'=>$onLineStu, ':totalStu'=>$totalStu, ':courseCode'=>$courseCode));
    		$this->disConnect();
		}
	}
	$setCourses = new setCon('localhost','mysql','','test');
	$setCourses->setCourse();
?>