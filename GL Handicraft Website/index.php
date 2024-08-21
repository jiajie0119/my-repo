<!DOCTYPE html>
<html>
<head>
<title>GL Handicraft Cottage Company</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="style.css">
<link rel="icon" type="png" sizes="16x16" href="images/favicon-16x16.png">


<script>
// When open the webpage
function showAlert()
{
  var myText = "Welcome to GL Handicraft Cottage Company Website !";
  alert (myText);
}
</script>

</head>

<body onload="showAlert()">


<body>

<!-- Navbar (sit on top) -->
<div class="w3-top">
  <div class="w3-bar w3-white w3-wide w3-padding w3-card">
    <a href="#home" class="w3-bar-item w3-button"><img src="images/icon.png" width="70" height="30"><b> GL</b> Handicraft</a>
    <!-- Float links to the right. Hide them on small screens -->
    <div class="w3-right w3-hide-small">
      <a href="#products" class="w3-bar-item w3-button">Products</a>
      <a href="#order" class="w3-bar-item w3-button">Order</a>
      <a href="#about" class="w3-bar-item w3-button">About</a>
      <a href="#contact" class="w3-bar-item w3-button">Contact</a>
    </div>
  </div>
</div>

<!-- Header -->
<header class="w3-display-container w3-content w3-wide" style="max-width:1500px;" id="home">
  <img class="img1" src="images/img1.jpg" alt="Architecture" width="1500" height="800">
  <div class="w3-display-middle w3-margin-top w3-center">
    <h1><span><b>GL</b></span> <span>Handicraft</span></h1>
  </div>
</header>

<!-- Page content -->
<div class="w3-content w3-padding" style="max-width:1564px">  

<!-- Menu Container -->
<div class="container black padding-64 xxlarge" id="products">
  <div class="content">
  
    <h1 class="center jumbo" style="margin-bottom:64px">Products</h1>
    <div class="row center border border-dark-grey">
      <a href="javascript:void(0)" onclick="openMenu(event, 'Batik');" id="myLink">
        <div class="w3-col s4 tablink padding-large hover-red">Batik</div>
      </a>
      <a href="javascript:void(0)" onclick="openMenu(event, 'Pasta');">
        <div class="w3-col s4 tablink padding-large hover-red">Pottery</div>
      </a>
      <a href="javascript:void(0)" onclick="openMenu(event, 'Starter');">
        <div class="w3-col s4 tablink padding-large hover-red">Basket</div>
      </a>
    </div>

    <div id="Batik" class="container menu padding-32 white">

      <h1><b>Floral Print Surplice Neck Belted Dress</b> <span class="right tag dark-grey round">RM120.00</span></h1>
      <div class="productsimg">
        <div>
          <img src="images/img14.jpeg" width="200" height="300">
        </div>
        <div>
          <ul class="text-grey" style="font-size: 15px; float:left;">
            <li>Color: Multicolor</li>
            <li>Style: Boho</li>
            <li>Pattern Type: Floral</li>
            <li>Type: A Line</li>
            <li>Neckline: V Neck</li>
            <li>Fit Type : Regular Fit</li>
            <li>Material: Polyester</li>
            <li>Composition: 100% Polyester</li>
            <li>Care Instructions: Machine wash or professional dry clean</li>
          </ul>
        </div>
      </div>
      <hr>
      
      <h1><b>Floral Print Belted Bishop Sleeve Dress</b> <span class="tag red round">Hot!</span><span class="right tag dark-grey round">RM100.00</span></h1>
      <div class="productsimg">
        <div>
          <img src="images/img15.jpeg" width="200" height="300">
        </div>
        <div>
          <ul class="text-grey" style="font-size: 15px; float:left;">
            <li>Color: Multicolor</li>
            <li>Style: Modest</li>
            <li>Pattern Type: Floral</li>
            <li>Type: A Line</li>
            <li>Neckline: Round Neck</li>
            <li>Fit Type : Regular Fit</li>
            <li>Material: Polyester</li>
            <li>Composition: 95% Polyester, 5% Elastane</li>
            <li>Care Instructions: Machine wash or professional dry clean</li>
            <li>Belt: Yes</li>
          </ul>
        </div>
      </div>
      <hr>

      <h1><b>Paisley Print Tie Neck Dress</b> <span class="tag red round">New!</span><span class="right tag dark-grey round">RM150.00</span></h1>
      <div class="productsimg">
        <div>
          <img src="images/img16.jpeg" width="200" height="300">
        </div>
        <div>
          <ul class="text-grey" style="font-size: 15px; float:left;">
            <li>Color: Multicolor</li>
            <li>Style: Boho</li>
            <li>Pattern Type: Paisley, Tribal</li>
            <li>Type: A Line</li>
            <li>Neckline: Tie Neck</li>
            <li>Fit Type : Regular Fit</li>
            <li>Material: Polyester</li>
            <li>Composition: 100% Polyester</li>
            <li>Care Instructions: Machine wash or professional dry clean</li>
          </ul>
        </div>
      </div>
    </div>

    <div id="Pasta" class="container menu padding-32 white">
      <h1><b>Handmade Pottery Vases</b> <span class="tag red round">Hot!</span> <span class="right tag dark-grey round">RM80.00</span></h1>
      <div class="productsimg">
        <div>
          <img src="images/img17.jpeg" width="300" height="300">
        </div>
        <div>
          <ul class="text-grey" style="font-size: 15px; float:left;">
            <li>Height: 7cm (2.75 in)</li>
            <li>Diameter: 6.5cm (2.36 in)</li>
            <li>Weight: 145g</li>
            <li>Mini decorative vases dried surface ONLY!</li>
            <li>Carved surface pattern</li>
            <li>White glaze on the inside</li>
            <li>Handmade pottery</li>
            <li>Great for decoration</li>
          </ul>
        </div>
      </div>
      <hr>
   
      <h1><b>Keceramics Handmade Ceramic Mini Vase</b> <span class="right tag dark-grey round">RM60.00</span></h1>
      <div class="productsimg">
        <div>
          <img src="images/img18.jpeg" width="300" height="300">
        </div>
        <div>
          <ul class="text-grey" style="font-size: 15px; float:left;">
            <li>Handmade designer ceramic rustic themed</li>
            <li>Home decoration, table display and flower pot</li>
            <li>Elegant handcrafted vase pot with Pucuk Paku and Zebra design</li>
            <li>Consumers' best choice. High quality handcrafted ceramic product</li>
            <li>Malaysian handicraft and ceramic artwork.</li>
            <li>Available in 2 designs (Pucuk Paku, Zebra)</li>
            <li>Size: 7x6 cm </li>
            <li>Weight: 100g</li>
          </ul>
        </div>
      </div>
      <hr>
      
      <h1><b>Ceramic Craft Vase</b> <span class="right tag dark-grey round">RM70.00</span></h1>
      <div class="productsimg">
        <div>
          <img src="images/img19.jpeg" width="300" height="300">
        </div>
        <div>
          <ul class="text-grey" style="font-size: 15px; float:left;">
            <li>18cm (L) x 13 cm (w) x 5cm (Mouth)</li>
            <li>Made from High quality Ceramic material</li>
            <li>Satin finish</li>
            <li>Grainy Texture Effect</li>
            <li>Non Porous / Waterproof</li>
          </ul>
        </div>
      </div>
    </div>


    <div id="Starter" class="container menu padding-32 white">
      <h1><b>Hand-Woven Rattan Wicker Basket</b> <span class="tag red round">New!</span><span class="right tag dark-grey round">RM50.00</span></h1>
      <div class="productsimg">
        <div>
          <img src="images/img20.jpeg" width="300" height="250">
        </div>
        <div>
          <ul class="text-grey" style="font-size: 15px; float:left;">
            <li>Size: 11.8 inch by 7.9 inch by 3.5 inch (30x20x9cm)</li>
            <li>handmade of the highest quality material</li>
            <li>Perfect to use as a decoration accent piece, as well as a storage bin</li>
          </ul>
        </div>
      </div>
      <hr>
   
      <h1><b>Handwoven All Natural Rattan Baskets</b> <span class="right tag dark-grey round">RM55.00</span></h1>
      <div class="productsimg">
        <div>
          <img src="images/img21.jpeg" width="300" height="300">
        </div>
        <div>
          <ul class="text-grey" style="font-size: 15px; float:left;">
            <li>Size: 8.2 inch by 7.1 inch by 2.6 inch </li>
            <li>Handmade of the rattan</li>
            <li>Suitable for hold anything you can think like wallets, keys, jewelry, phones, toiletries, kitchen items, bread, fruits, vegetables and dry foods.</li>
          </ul>
        </div>
      </div>
      <hr>
      
      <h1><b>Rattan Storage Basket With Handle</b> <span class="right tag dark-grey round">RM40.00</span></h1>
      <div class="productsimg">
        <div>
          <img src="images/img22.jpeg" width="300" height="300">
        </div>
        <div>
          <ul class="text-grey" style="font-size: 15px; float:left;">
            <li>Size: 11.8 inch by 10.6 inch by 9.1 inch (30x27x23cm)</li>
            <li>Handmade of the ecological and durable material</li>
            <li>Suitable for gift basket, storage for bathrooms, bedrooms and kitchen.</li>
          </ul>
        </div>
      </div>
      
    </div><br>

  </div>
</div>

<script>
// Tabbed Menu
function openMenu(evt, menuName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("menu");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" red", "");
  }
  document.getElementById(menuName).style.display = "block";
  evt.currentTarget.firstElementChild.className += " red";
}
document.getElementById("myLink").click();
</script>

<hr><hr>  
<div id=t1>
<h3 class="w3-border-bottom w3-border-light-grey w3-padding-16" id="order"><b>Order Page</b></h3> 
<form action="<?php echo $_SERVER['PHP_SELF'];?>" method='POST'>
    <label for=name>Buyer's Name: </label><input type=text name='buy'/><br>
    <label for=name>Buyer's Address: </label><input type=text name='address' /><br>
    <label for=name>Contact Number: </label><input type=text name='cnum' /><br><br><br>
    <table width='50%'>
    <tr>   
      <th>Product</th>
      <th>Price</th>
      <th>Quantity</th>   
    </tr>
    <tr>   
      <td>Floral Print Surplice Neck Belted Dress</td>
      <td>RM 120.00</td>
      <td id=td1><input type=text name='upp1'></td>   
    </tr>
    <tr>   
      <td>Floral Print Belted Bishop Sleeve Dress</td>
      <td>RM 100.00</td>
      <td id=td1><input type=text name='upp2'></td>   
    </tr>
    <tr>   
      <td>Paisley Print Tie Neck Dress</td>
      <td>RM 150.00</td>
      <td id=td1><input type=text name='upp3'></td>   
    </tr>
    <tr>   
      <td>Handmade Pottery Vases</td>
      <td>RM 80.00</td>
      <td id=td1><input type=text name='upp4'></td>   
    </tr>
    <tr>   
      <td>Keceramics Handmade Ceramic Mini Vase</td>
      <td>RM 60.00</td>
      <td id=td1><input type=text name='upp5'></td>   
    </tr>
    <tr>   
      <td>Ceramic Craft Vase</td>
      <td>RM 70.00</td>
      <td id=td1><input type=text name='upp6'></td>   
    </tr>
    <tr>   
      <td>Hand-Woven Rattan Wicker Basket</td>
      <td>RM 50.00</td>
      <td id=td1><input type=text name='upp7'></td>   
    </tr>
    <tr>   
      <td>Handwoven All Natural Rattan Baskets</td>
      <td>RM 55.00</td>
      <td id=td1><input type=text name='upp8'></td>   
    </tr>
    <tr>   
      <td>Rattan Storage Basket With Handle</td>
      <td>RM 40.00</td>
      <td id=td1><input type=text name='upp9'></td>   
    </tr>
    </table> 
    <h3>Payment Method</h3>
    <input type="radio" name="payment" value="Visa">Visa<br>
    <input type="radio" name="payment" value="Master Card">Master Card<br>
    <input type="radio" name="payment" value="TNG">TNG<br>
    <input type="radio" name="payment" value="Boost">Boost<br>
    <input type=submit name='submit' value='Submit Order' />
    <input type=reset name='reset' />
  </form>
</div>
<hr style="background-color: #ffccff; height :1em; width:100%">
  <div id=t2>
  <?php
    if($_SERVER['REQUEST_METHOD']=='POST'){
      $upp1 = $upp2 = $upp3 = $upp4 = $upp5 = $upp6 = $upp7 = $upp8 = $upp9 = $buyer = $street = $city =0;
      $payment=0;   

       if(isset($_POST['submit'])){
         if(empty($upp1) && empty($upp2) && empty($upp3) && empty($upp4) && empty($upp5) && empty($upp6) && empty($upp7) && empty($upp8) && empty($upp9) &&
          empty($buyer) && empty($street) && empty($city) && empty($_POST['payment']))
            echo "Missing data";
          else{
           $upp1 = $_POST['upp1']*120;
           $upp2 = $_POST['upp2']*100;
           $upp3 = $_POST['upp3']*150;
           $upp4 = $_POST['upp4']*80;
           $upp5 = $_POST['upp5']*60;
           $upp6 = $_POST['upp6']*70;
           $upp7 = $_POST['upp7']*50;
           $upp8 = $_POST['upp8']*55;
           $upp9 = $_POST['upp9']*40;
           $payment = $_POST['payment'];
           $table = "<h3>Customer : $_POST[buy]<br>
                     Address : $_POST[address]</br>
                     Contact Number : $_POST[cnum]</h3>
           <table border='1'>
           <caption> Order Information </caption>
           <tr>
            <th>Product</th>
            <th>Unit Price</th>
            <th>Quantity Ordered</th>
            <th>Item Cost</th>
           </tr>
            <tr>
            <td>Floral Print Surplice Neck Belted Dress</td>
            <td>RM 120.00</td>
            <td>$_POST[upp1] items </td>
            <td>RM ".number_format($upp1,2)."</td>
           </tr>
           <tr>
            <td>Floral Print Belted Bishop Sleeve Dress</td>
            <td>RM 100.00</td>
            <td>$_POST[upp2] items </td>
            <td> RM ".number_format($upp2,2)." </td>
           </tr>
           <tr>
            <td>Paisley Print Tie Neck Dress</td>
            <td>RM 150.00</td>
            <td>$_POST[upp3] items </td>
            <td> RM ".number_format($upp3,2)." </td>
           </tr>
           <tr>
            <td>Handmade Pottery Vases</td>
            <td>RM 80.00</td>
            <td>$_POST[upp4] items </td>
            <td> RM ".number_format($upp4,2)."</td>
           </tr>
           <tr>
           <td>Keceramics Handmade Ceramic Mini Vase</td>
           <td>RM 60.00</td>
           <td>$_POST[upp5] items </td>
           <td> RM ".number_format($upp5,2)."</td>
          </tr>
          <tr>
          <td>Ceramic Craft Vase</td>
          <td>RM 70.00</td>
          <td>$_POST[upp6] items </td>
          <td> RM ".number_format($upp6,2)."</td>
         </tr>
         <tr>
         <td>Hand-Woven Rattan Wicker Basket</td>
         <td>RM 50.00</td>
         <td>$_POST[upp7] items </td>
         <td> RM ".number_format($upp7,2)."</td>
        </tr>
        <tr>
        <td>Handwoven All Natural Rattan Baskets</td>
        <td>RM 55.00</td>
        <td>$_POST[upp8] items </td>
        <td> RM ".number_format($upp8,2)."</td>
       </tr>
       <tr>
       <td>Rattan Storage Basket With Handle</td>
       <td>RM 40.00</td>
       <td>$_POST[upp9] items </td>
       <td> RM ".number_format($upp9,2)."</td>
      </tr>
           </table>";
           echo $table;

           echo "<br><br>You ordered ".($_POST['upp1']+$_POST['upp2']+$_POST['upp3']+$_POST['upp4']+$_POST['upp5']+$_POST['upp6']+$_POST['upp7']+$_POST['upp8']+$_POST['upp9'])." items.
            <br>Your total bill is RM ".number_format(($upp1+$upp2+$upp3+$upp4+$upp5+$upp6+$upp7+$upp8+$upp9),2)."<br>
            Your chosen method of payment is ".$_POST['payment'].".";
          }         
          }
        }
  ?>

  <!-- About Section -->
  <div class="w3-container w3-padding-32" id="about">
    <h3 class="w3-border-bottom w3-border-light-grey w3-padding-16"><b>About Us</b></h3>
    <div class="parent">
    <div class ="img"><img src="images/img2.jpeg"/></div>
    <div class="text"><pre>          GL Handi Cottage Company is a group of three woman weavers and artisans who are dedicated to the production, 
<pre>          promotion, and propagation of handcrafted fabrics.This ever-expanding community of craftswomen began with a 
<pre>          research and development workshop established by Ms Nazirah binti Nazir in 1999. GL Handi Cottage Company 
<pre>          aims to fulfil the foundation's vision of improving the lives and livelihoods of women and rural communities 
<pre>          through the Malaysian traditional art of weaving.</pre></pre></pre></pre></pre></div></div>
    <br><h5><b><i> Our Vision </i></b></h5>
    <ul>
        <li>We would like to ensure that traditional Malaysian craft survives this generation so that the next generation can enjoy and benefit from the craft of their forefathers.</li>
    </ul><br>
    <h5><b><i> Our Mission </i></b></h5>
    <ol type="i">
        <li>Whatever remnants of artisanal skills remain with us today must be nurtured and advanced so that craft can thrive once again.
        <li>To create viable careers and vibrant ecosystems centred on heritage craft.
        <li>To provide an opportunity for the local craft industry to contribute to the economy and international trade.</li></li></li>
    </ol>
  </div>

  <!-- Contact Section -->
  <div class="w3-container w3-padding-32" id="contact">
    <h3 class="w3-border-bottom w3-border-light-grey w3-padding-16"><b>Contact Us</b></h3>
    <p>Please contact us for further information.</p>
    <form action="/action_page.php" target="_blank">
      <input class="forminput border" type="text" placeholder="Name" required name="Name">
      <input class="forminput section border" type="text" placeholder="Email" required name="Email">
      <input class="forminput section border" type="text" placeholder="Subject" required name="Subject">
      <input class="forminput section border" type="text" placeholder="Comment" required name="Comment">
      <button class="button black section" type="submit">
        <i class="fa fa-paper-plane"></i> SEND MESSAGE
      </button>
    </form>
  </div>

  <p>Email: <a class=lk href="mailto:handicraft.gl@gmail.com">handicraft.gl@gmail.com</a></p>
  <p>Tel: <a class=lk href="tel:+60184664934">018-4664934</a></p>
  <p>Address: <a class=lk href="https://www.google.com/maps/place/Quest+International+University+(QIU)/@4.5825732,101.0926961,17z/data=!3m1!4b1!4m5!3m4!1s0x31caec4190fddc21:0xf71c82ce95ddde4e!8m2!3d4.5825732!4d101.0948848">No.227, Jalan Raja Permaisuri Bainun, 30250 Ipoh, Perak</a></p>
  
<!-- Footer -->
<footer class="black padding-16" style="text-align:center;">
  <p>Created by Jia Jie, Wei Xian & Wai Fong</a></p>
</footer>

</body>
</html>