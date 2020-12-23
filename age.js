AgeCalculator();
    
function AgeCalculator()
{

var item=WF.focusedItem();
if(item!=null)
{
var str=item.getName();

//str='Dell Laptop Gaming  <time startYear="2017" startMonth="9" startDay="14">Thu, Sep 14, 2017</time>   ';

var input=str.substring(str.indexOf('<time'),(str.indexOf('</time> ')+8));


var mydate = new Date(item.getNameInPlainText());
//var mydate = new Date('Dell Laptop Gaming  Thu, Sep 14, 2017   ' );
var date1 = new Date(mydate);
var date2 = new Date();
var diff = new Date(date2 - date1);

var strOutput=str.substring(0,str.indexOf('<time')) 
strOutput+=(diff.getUTCFullYear() - 1970)+' Years, '+(diff.getUTCMonth())+' Months, '+(diff.getUTCDate() - 1)+' Days';

console.log(strOutput);
//WF.setItemName(item,strOutput);
alert(strOutput);
}
else
{
var arr=WF.getSelection();
var strOutput='';
for(i=0;i<arr.length;i++)
{
var str=arr[i].getName();

//str='Dell Laptop Gaming  <time startYear="2017" startMonth="9" startDay="14">Thu, Sep 14, 2017</time>   ';

var input=str.substring(str.indexOf('<time'),(str.indexOf('</time> ')+8));


var mydate = new Date(arr[i].getNameInPlainText());
//var mydate = new Date('Dell Laptop Gaming  Thu, Sep 14, 2017   ' );
var date1 = new Date(mydate);
var date2 = new Date();
var diff = new Date(date2 - date1);

strOutput+=str.substring(0,str.indexOf('<time')) 
strOutput+=(diff.getUTCFullYear() - 1970)+' Years, '+(diff.getUTCMonth())+' Months, '+(diff.getUTCDate() - 1)+' Days';
strOutput+='\n'
console.log(strOutput);
//WF.setItemName(item,strOutput);

}
alert(strOutput);
}

}