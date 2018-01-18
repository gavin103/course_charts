<?php 
	require_once 'consql.php';
	class getCon extends Conmysql{
		public function __construct($servername,$username,$password, $dbname){
			parent::__construct($servername,$username,$password, $dbname);
		}
		public function getCourse(){
			$sql = "SELECT `createDate`, `onLineStu`, `totalStu`, `courseCode` FROM `t_coursesdata` WHERE 1";
			$this->getData($sql);
		}
	}
	$getCourses = new getCon('localhost','mysql','','test');
	$getCourses->getCourse();
?>