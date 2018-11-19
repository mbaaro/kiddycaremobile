<?php
 // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
        //lets  allow for localhost
     
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
            //lets  allow for localhost    

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        //lets  allow for localhost
      
        exit(0);
    }
	

if(isset($_GET['id'])){
//request has passed the first authenticity trap
$count=0;
$id=$_GET['id'];
$con=connect();

if($id=='credcheck'){
    $uname=$_GET['uname'];
    $upass=$_GET['upass'];
   

$query=$con->query("select * from `emps` where `UName`='$uname' and UPass='$upass'");
$count=$query->num_rows;
//echo $count;
while($row=$query->fetch_object()){
$data=array(
'Firstname'=>$row->FirstName,   'Lastname'=>$row->LastName,
'Mobile'=>$row->Mobile,         'Uname'=>$row->UName,
'Upass'=>$row->UPass,           'Utype'=>$row->UType,
'Resetcode'=>$row->ResetCode,   'Deleted'=>$row->Deleted,
    );
echo json_encode(array('count'=>$count,'data'=>$data));

}
}
elseif($id=='fetchcategories'){
$query=$con->query("select * from categories where `deleted`=0");
while($row=$query->fetch_object()){
$data[]=array(
'CategoryNo'=>$row->CategoryNo,
'Category'=>$row->Category,
'Deleted'=>$row->Deleted
    );
}
echo json_encode(array('data'=>$data));
}

elseif($id=='getall'){

$query=$con->query("select * from categories where `deleted`=0");
while($row=$query->fetch_object()){
$categories[]=array(
'CategoryNo'=>$row->CategoryNo,
'Category'=>$row->Category,
'Deleted'=>$row->Deleted
    );
}
$query1=$con->query("select * from stock where `deleted`=0");
while($row1=$query1->fetch_object()){
$items[]=array(
'id'=>$row1->Id,
'category'=>$row1->Category,
'itemdesc'=>$row1->ItemDesc,
'quantity'=>$row1->Quantity,
'maxdiscount'=>$row1->MaxDiscount,
'buyingp'=>$row1->BuyingPrice,
'sellingp'=>$row1->SellingPrice
    );
}


echo json_encode(array('categories'=>$categories,'items'=>$items));
}
elseif($id=='newstock'){/*
$postdata=file_get_contents('php://input');
//we are posting new items into stock.... lets get them from the encoded json and decode

$decoded=$postdata;

    $category=$decoded->category;
    $description=$decoded->description;
    $quantity=$decoded->quantity;
    $buyingp=$decoded->buyingp;
    $sellingp=$decoded->sellingp;
    $maxdiscount=$decoded->maxdiscount;

$currentquantity=0;
$newquantity=0;
//lets get how many of these items already exist in the databas
$query1=$con->query("select sum(`Quantity`) AS Total from stocks where `Category`='$category'  and `ItemDesc`='$description' ");
while($row=$query1->fetch_object()){
$currentquantity=$row->Total
}
$newquantity=($currentquantity+$quantity);
//update the quantity
//INSERT INTO `stock` (`Category`, `ItemDesc`, `Quantity`, `BuyingPrice`, `SellingPrice`, `MaxDiscount`) VALUES (?, ?, ?,?,?,?) 
 $query=$con->prepare("update `stocks` set `Quantity`=? where `Category`=? and `ItemDesc`=? ");
   $query->bind_param('sss',$newquantity,$category,$description); 
    $query->execute();
echö $newquantity;
 */}

        elseif($id=='getcategories'){
            //lets fetch the existing  categories
            $query=$con->query("SELECT * FROM `categories` where deleted='0' ");
            while($row=$query->fetch_object()){
                $data[]=array(
'CategoryNo'=>$row->CategoryNo,
'Category'=>$row->Category,
'description'=>$row->description
//'Deleted'=>$row->Deleted
                    );

            }
            echo json_encode(array('data'=>$data));
        }

        elseif($id=='deletecategory'){
//lets set the category requested to deleted
            $catid=$_GET['catid']; 
            $query=$con->prepare("UPDATE `categories` SET `Deleted`='1' WHERE `CategoryNo`=?");
            $query->bind_param('i',$catid);
            $query->execute();
 echo json_encode("Category deleted");

        }   
        elseif($id=='postcategory'){
            $postdata=file_get_contents("php://input");
            $result=json_decode($postdata);
            $category=$result->category;
           $description=$result->description;

           $query=$con->prepare("INSERT INTO `categories`( `Category`, `description`) VALUES (?,?)");
           $query->bind_param('ss',$category,$description);
           $query->execute();
        } 
 elseif($id=='deletestock'){
//a request to delete the stock item from mobile
$stockid=$_GET['stockid'];
$query=$con->prepare('update `stock`set `Deleted`=1 where Id=?'); 
$query->bind_param('i',$stockid); 
if($query->execute()) {
    //if successfull send success message
    echo(json_encode('Success'));
} else{
    //if the update failed
   echo(json_encode('Operation failed')); 
} }
     elseif($id=='updatestock'){
        //lets get the data posted
        $postdata=file_get_contents("php://input");
        $result=json_decode($postdata);
        $id=$result->id;
        $category=$result->category;
        $description=$result->description;
        $quantity=$result->quantity;
        $buyingp=$result->buyingP;
        $sellingp=$result->sellingP;
        $maxdiscount=$result->maxdiscount;

        //lets update
        $query=$con->prepare("UPDATE `stock` SET `Category`=?,`ItemDesc`=?,`Quantity`=?,`Image`='',`BuyingPrice`=?,`SellingPrice`=?,`MaxDiscount`=? WHERE `Id`=?");
        $query->bind_param('sssssss',$category,$description,$quantity,$buyingp,$sellingp,$maxdiscount,$id);
        $query->execute();
     }

elseif($id=='fetchstock'){
//get the items in stock
    $query=$con->query("SELECT * FROM `stock` where Deleted='0'");
while($row=$query->fetch_object()){
$data[]=array(
'Id'=>$row->Id,
'Category'=>$row->Category,
'ItemDesc'=>$row->ItemDesc,
'Quantity'=>$row->Quantity,
'Image'=>$row->Image,
'BuyingPrice'=>$row->BuyingPrice,
'SellingPrice'=>$row->SellingPrice,
'MaxDiscount'=>$row->MaxDiscount
    );

}
echo json_encode(array('data'=>$data));
} 


elseif($id=='reducestock'){
//reducing a stock after an item  has been selected for sale or order
    $id1=$_GET['itemid'];
    $quantity=$_GET['quantity'];
    $newquantity=0;
    $query=$con->query("SELECT `Quantity` FROM `stock` where `Id`='$id1'");
    while($row=$query->fetch_object()){
$newquantity=(($row->Quantity)-$quantity);

    }
    //update what is in stock
    $qry=$con->prepare("UPDATE `stock` SET `Quantity`=? WHERE `Id`=?");
    $qry->bind_param('ss',$newquantity,$id1);
    if($qry->execute()){
echo json_encode("Update successful");
    }else{
echo json_encode("Update not successful");
    }

   
} 

elseif($id=='addstock'){
//readding stock that was previously remokved from stock
    //get what is already in stock
    $itemid=$_GET['itemid'];
    $quantitychanged=$_GET['quantity'];
    $newquantity=0;
    $query=$con->query("SELECT `Quantity` FROM `stock` where `Id`='$itemid'");
    while($row=$query->fetch_object()){
$newquantity=(($row->Quantity)+$quantitychanged);
    }
    //update what is in stock
    $qry=$con->prepare("UPDATE `stock` SET `Quantity`=? WHERE `Id`=?");
    $qry->bind_param('ss',$newquantity,$itemid);
    if($qry->execute()){
echo json_encode("Update successful");
    }else{
echo json_encode("Update not successful");
    }


}   
elseif($id==''){}      

    else{
        echo json_encode("This is a wrong request");
    }

}
	else{
//id not set thus not a legit request
		echo json_encode( "This is a wrong request");
	}


	
	
	
function connect(){
    $con=new mysqli('localhost','root','','kiddycare');
    return $con;
}
?>