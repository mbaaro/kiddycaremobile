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
$type="sale";
if(isset($_GET['type'])){    if($_GET['type']=='order'){$type="order";    }}
    $id1=$_GET['itemid'];

    $quantity=$_GET['quantity'];

    $uname=$_GET['uname'];

    $newquantity=0;

    $query=$con->query("SELECT `Quantity` FROM `stock` where `Id`='$id1'");

    while($row=$query->fetch_object()){

$newquantity=(($row->Quantity)-$quantity);



    }

    //update what is in stock

    $qry=$con->prepare("UPDATE `stock` SET `Quantity`=? WHERE `Id`=?");

    $qry->bind_param('ss',$newquantity,$id1);

    if($qry->execute()){

        //lets insert into temptable  

        inserttemp($id1,$quantity,$uname,$type);

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

    $oldquantity=0;

     $uname=$_GET['uname'];

    $query=$con->query("SELECT `Quantity` FROM `stock` where `Id`='$itemid'");

    while($row=$query->fetch_object()){

$newquantity=(($row->Quantity)+$quantitychanged);

$oldquantity=$row->Quantity;

   

    //update what is in stock

    $qry=$con->prepare("UPDATE `stock` SET `Quantity`=? WHERE `Id`=?");

    $qry->bind_param('ss',$newquantity,$itemid);

    if($qry->execute()){

        //lets update what was in the tempdata

       // updatetemp($item,$newquantity,$username,$quantity);

        updatetemp($itemid,$uname,$quantitychanged);

echo json_encode("Update successful");

    }else{

echo json_encode("Update not successful");

    }}





}   

elseif($id=='cleararray'){

$postdata=file_get_contents("php://input");

$response=json_decode($postdata);


$fw=fopen('testarray.php', 'a');

fwrite($fw, $response);

//echo json_encode($response);



} 

elseif($id=='completesale'){
   //lets complete the sale using the array pushed
$postdata=file_get_contents("php://input");
$response=json_decode($postdata);
$username=$response->user;
$method=$response->method;
$saleitems=$response->saleitems;
  //get the sale id
$saleid=0;
$query1=$con->query("SELECT max(`Id`) as `maxid` FROM `sales`");
while($row=$query1->fetch_object()){
$saleid=($row->maxid+1);
}

foreach ($saleitems as $sold) {
    $item=$sold->item;
    $quantity=$sold->quantity;
    $price=$sold->price;
    $total=$sold->total;
    $seller=$sold->seller;
   
//fwrite($fw, ); 

  //lets insert each record into the database sales table
   $query=$con->prepare("INSERT INTO `sales`(`SaleId`,`ItemName`, `Quantity`, `Price`, `Total`,`SoldBy`, `PaymentMethod`) VALUES (?,?,?,?,?,?,?)");
  $query->bind_param('sssssss',$saleid,$item,$quantity,$price,$total,$seller,$method);
  $query->execute();
 }
//now that we are done inserting into sales, lets delete the same from the temp table
$con->execute("delete * from `tempsales` where `username`='$username' and `type`='sale' ");
}      
elseif($id=='completeorder'){
//lets clear contents of order
    $postdata=file_get_contents("php://input");
    $result=json_decode($postdata);
   $customer=$result->customer;
   $notes=$result->notes;
   $phone=$result->phone;
$orderitems=$results->orderitems;
$username=$results->uname;
//get the order id
$orderid=0;
$query1=$con->query("SELECT max(`OrderId`) as `maxid` FROM `orders`");
while($row=$query1->fetch_object()){
$orderid=($row->maxid+1);
}
foreach ($orderitems as $items) {
  //lets insert into the stocks table
    $query=$con->prepare("INSERT INTO `orders`( `OrderNo`, `CustomerName`, `CustomerPhone`, `Item`, `Quatity`, `Description`, `username`) VALUES (?,?,?,?,?,?,?)");
    $query->bind_param('sssssss',$orderid,$customer,$phone,$items->item,$items->quantity,$notes,$username);
    $query->execute();
}
//after all have been inserted, lets delete from the temp slaes
$con->query("Delete from `tempsales` where `username`='$username' and `type`='order' ");

}   
elseif($id=='fetchorders'){
    //get all the uncollected orders
    //`OrderId`,`OrderNo`,`CustomerName`,`CustomerPhone`,`Item`,`Quatity`,`Quatity``Description`,`OrderDate`,`Delivered`,`username`
   $orderno=$con->query("SELECT DISTINCT(`OrderNo`) as `order_no` from `orders` where `Delivered`=false");
   while($row1=$orderno->fetch_object()){
    $data2[]=array(
'order_no'=>$row1->order_no,
        );
   }
    $customer=$con->query("SELECT DISTINCT(`CustomerName`) as `customer` from `orders` where `Delivered`=false ");
   while($row1=$customer->fetch_object()){
    $data1[]=array(
'customer'=>$row1->customer,
        );
   }
   $query=$con->query("SELECT * FROM `orders` WHERE `Delivered`='0'");
    while($row=$query->fetch_object()){
$data[]=array(
'orderno'=>$row->OrderNo,
'CustomerName'=>$row->CustomerName,
'CustomerPhone'=>$row->CustomerPhone,
'Item'=>$row->Item,
'Quatity'=>$row->Quatity,
'Description'=>$row->Description,
'username'=>$row->username,

    );
    }
    echo json_encode(array('orderno'=>$data1,'customer'=>$data2,'data'=>$data));
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





    function inserttemp($item,$quantity,$username,$type){

        //lets insert the item picked temporariry into a table

 $con=new mysqli('localhost','root','','kiddycare');

     $query=$con->prepare("INSERT INTO `tempsales`(`username`, `itemid`, `quantity`,`type`) VALUES (?,?,?,?)");

    $query->bind_param('ssss',$username,$item,$quantity,$type);

    $query->execute();





    }

    function updatetemp($item,$username,$quantity){

       

 $con=new mysqli('localhost','root','','kiddycare');

 

//lets update the quatity



 $query=$con->query("select * from `tempsales` where `itemid`='$item' and `username`='$username' and `quantity`>0 order by `quantity` limit 1");

 //var_dump($query->fetch_object());

 while($row=$query->fetch_object()){

$newqty=(($row->quantity)-$quantity);

$id=$row->id;

  $query1=$con->prepare("UPDATE  `tempsales` SET `quantity`=? where `id`=? ");

    $query1->bind_param('ss',$newqty,$id);

   $query1->execute();

 }

    }

    

function connect(){

    $con=new mysqli('localhost','root','','kiddycare');

    return $con;

}

?>