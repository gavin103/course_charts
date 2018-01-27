<?php 
	require_once 'consql.php';
	class getCon extends Conmysql{
		public function __construct($servername,$username,$password, $dbname){
			parent::__construct($servername,$username,$password, $dbname);
		}
		public function getCourse(){
			if($this->con==null){
				$this->getConnection();
			}
			$limit = $_GET['limit'];
			$sql = "SELECT `createDate`, `onLineStu`, `totalStu`, `courseCode` FROM `t_coursesdata` ORDER BY `id` DESC LIMIT $limit";
			$statement=$this->con->prepare($sql);
			$statement->execute();
			$results=$statement->fetchAll(PDO::FETCH_ASSOC);
			$res=json_encode($results);
			echo $res;
			$this->disConnect();
		}
	}
	$getCourses = new getCon('localhost','mysql','','test');
	$getCourses->getCourse();
?>