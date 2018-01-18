<?php 
	require_once 'consql.php';
	class setCon extends Conmysql{
		public function __construct($servername,$username,$password, $dbname){
			parent::__construct($servername,$username,$password, $dbname);
		}
		public function setCourse(){
			$sql = "INSERT INTO `t_coursesdata` (`id`, `createDate`, `onLineStu`, `totalStu`, `courseCode`) VALUES (NULL, \'2018/1/11\', \'2000人\', \'45623人\', \'13\')";
			$this->setData($sql);
		}
	}
	$setCourses = new setCon('localhost','mysql','','test');
	$setCourses->setCourse();
?>