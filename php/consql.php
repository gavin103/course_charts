<?php 
	class Conmysql{
		public $servername;
		public $username;
		public $password;
		public $dbname;
		public $con=null;
		public function __construct($servername,$username,$password,$dbname){
			$this->servername=$servername;
			$this->username=$username;
			$this->password=$password;
			$this->dbname=$dbname;
		}
		public function getConnection(){
        	try {
         		$dsn="mysql:host=$this->servername;dbname=$this->dbname";	
         		$this->con= new PDO($dsn,$this->username, $this->password,array(PDO::MYSQL_ATTR_INIT_COMMAND => "set names utf8"));
        	}
        	catch(PDOException $e)
        		{
           		echo $e->getMessage();
         	}
		}
		public function getData($sql){
			if($this->con==null){
				$this->getConnection();
			}
			$statement=$this->con->prepare($sql);
			$statement->execute();
			$results=$statement->fetchAll(PDO::FETCH_ASSOC);
			$res=json_encode($results);
			echo $res;
			$this->disConnect();
		}
		public function setData($sql){
			if ($this->con==null) {
    			$this->getConnection();
    		}
    		$statement=$this->con->prepare($sql);
    		$statement->execute();
    		echo $this->con->lastInsertId();
    		$this->disConnect();
		}
		public function disConnect(){
			$this->con=null;
		}
	}

?>
