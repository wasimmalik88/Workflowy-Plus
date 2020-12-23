var days= prompt("Enter No of Days to add", "1");
WFAddDays(parseInt(days));
    
function WFAddDays(NoOfDay)
{
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

var item=WF.focusedItem();
var str=item.getName();
var input=str.substring(str.indexOf('<time'),(str.indexOf('</time> ')+8));


var mydate = new Date(item.getNameInPlainText());

var strOutput=str.substring(0,str.indexOf('<time'))+'<time startYear="'+(mydate.addDays(NoOfDay).getYear()+1900);
strOutput+='" startMonth="'+(mydate.addDays(NoOfDay).getMonth()+1);
strOutput+='" startDay="'+(mydate.addDays(NoOfDay).getDate());

var strDate=mydate.addDays(NoOfDay).toDateString();
var res = strDate.split(" ")

strOutput+='">'+res[0]+', '+res[1]+' '+res[2]+', '+res[3]+'</time>';

WF.setItemName(item,strOutput);
}

