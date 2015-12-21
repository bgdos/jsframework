/** get element **/
function getElement(e, attributes)//receive element name or css selector (#id, .class, p, etc.)
{
    var element;
    try
    {
        element = document.getElementById(e);
        if (element == null)
            element = document.querySelector(e);
    }
    catch(err)
    {
        console.log(err.message);
    }
    setCSS(element, attributes);
    return element;
}
/** add attributes to the element **/
function setAttributes(e, attributes)
{
    for (var p in attributes)
        if (attributes.hasOwnProperty(p)) 
           e.setAttribute([p],  attributes[p]);
}
/** add css attributes to the element **/
function setCSS(e, attributes)
{
    for (var p in attributes)
        if (attributes.hasOwnProperty(p)) 
           e.style[p] = attributes[p];
}
/** create element**/
function createElement(e, attributes, cssAttributes)
{
    var e = document.createElement(e);
    setAttributes(e, attributes);
    setCSS(e, cssAttributes);
    return e;
}
/** asign enter to a element**/
function enterButton(element)//receive element name
{
    document.onkeypress = keyPress;

        function keyPress(e)
        {
            var x = e || window.event;
            var key = (x.keyCode || x.which);
             if(key == 13 || key == 3){
             getElement(element).focus();
			getElement(element).onclick();
        }
    }
}
/** array maximum **/
function arrayMaximum(array)
{
    var max = Math.max.apply(Math, array);
    return max;
}
/** array minimum **/
function arrayMinimum(array)
{
    var min = Math.min.apply(Math, array);
    return min;
}
/** array average**/
function arrayAverage(array)
{
    var aver = (array.reduce(function(a, b) { return a + b; })/array.length).toFixed();
    return aver;
}
/** modal window**/
var dg = true;
function dialogBox(text) { 
    var dialog;
    if (dg) { dialog = createElement('dialog'); document.body.appendChild(dialog); dg = false;}
    else { dialog = getElement('dialog');}
    dialog.innerHTML = text;
    dialog.showModal();
    //document.body.removeChild(dialog); 
} 
/** generate a random number **/ 
function getRandomColor() {//refference http://stackoverflow.com/a/1484514/4225925
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
/** pop-up window **/
//Fill the window properties
var pop = true;
function popInfo(header, message, timeout)
{
    var popup;
    if (pop) { 
        popup = createElement('div'); 
        popup.className = 'popup';
        popup.innerHTML = 
        '<div class="info">' +
            '<a class="close" onclick="closePopup()"></a>' +
            '<div class="popup-header">' +
                '<h1 id="popheader">' + header + '<span id="head-mess"></span></h1>' +
            '</div>' +
            '<div id="pop-message">' + 
                message +
            '</div>' +
         '</div>';
        document.body.appendChild(popup); pop = false;
    }
    else 
    { 
        getElement('popheader').innerHTML = header;
        getElement('pop-message').innerHTML = message;
    }
	openPopup();
	if (timeout > 0)// to auto close the popup
		setTimeout(function(){closePopup();},timeout);
}
// open the window
function openPopup(){
    getElement('.popup').style.display = 'inline'; 
    var pi = getElement('.info');
    var wh = document.documentElement.clientHeight;
    var ph = pi.clientHeight;
    var p = ((100/ wh) * ph) / 2;
    p = (50 - p) + "%"
    pi.style.top = p;
    var ww = document.documentElement.clientWidth;
    var pw = pi.clientWidth;
    var p = ((100/ ww) * pw) / 2;
    p = (50 - p) + "%"
    pi.style.left = p;
    return false;
	
}
//close the window
function closePopup(){
    getElement('.info').style.top = '-100%';
    setTimeout(function(){getElement('.popup').style.display = 'none'; }, 250);
    return false;
}
/** convert json to array **/
function jsonToArray(JSONobj)
{
    return array = Object.keys(JSONobj).map(function(_) { return JSONobj[_]; })// solution by mvallebr
}
/** Change the css of the document **/
function changeCSS(newCSS) {
    var oldlink = document.getElementsByTagName("link").item(0);
    if (oldlink.getAttribute("href") == "css/style.css")
        oldlink.setAttribute("href", newCSS);
    else
        oldlink.setAttribute("href", "css/style.css");
}
/** clock **/
function setClock(e, b)// recive the element where the clock is going to show / second is a bolean if true for 12 hr clock
{
    var today = new Date();
    var h = today.getHours();
    if (b)
        if (h > 12) h = today.getHours() - 12; // 12 hours clock
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = (h < 10)? "0" + h: h;;
    m = (m < 10)? "0" + m: m;
    s = (s < 10)? "0" + s: s;
    getElement(e).innerHTML = h + ":" + m + ": " + s;
    var t = setTimeout(function(){setClock(e, b);}, 500);
}
/** date **/
// create a date object
function getDate(){ 
    var d = new Date();
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];//to get the day of the week
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month = d.getMonth()+1;
    var day = d.getDate();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    this.date = { year : d.getFullYear(), month: month, day: day, weekday: weekdays[d.getDay()], monthName: monthNames[month-1]};//create the object
	return this.date;
}
// display the date
function setDate()
{
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var date = getDate();
    var formatedDate = monthNames[date.month-1] + " " + date.day + ", " + date.year;
    //document.getElementById("weekday").innerHTML = weekdays[date.weekday];//get the day of the week
    return formatedDate;
}
/** get local time HH/MM/SS **/
function getTime()
{
    date = new Date();
    var hour = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
    var minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
    var time = hour + ":" + minutes + ":" + seconds;
    return time;
}
/** get a random number **/
function getRandomNumber(a, b)
{
    var random = Math.floor(Math.random() * (a - b + 1)) + b; //max ; min (random between max - min)
    return random;
}
/** append css **/
function appendCSS(l)//receive the location of the css file
{
    var link = createElement('link');
    link.href = l;
    link.rel= "stylesheet";
    getElement('head').appendChild(link);
}
function appendJS(s)//receive the location of the css file
{
    var script = createElement('script');
    script.src = s;
    getElement('head').appendChild(script);
}
/** working with tables **/
function createRow(tds)
{
    this.cell = createElement('tr');
    for (var i = 0; i < tds.length; i++)
    {
        var c = createElement('td');
        c.innerHTML = tds[i];
        this.cell.appendChild(c);
    }
    return this.cell;
}
/** add class **/
function addClass(e, c)
{
    if (e != null)
        if (e.className == '')
            e.className = c;
        else
            e.className = e.className + " " + c;
}
/** remove class **/
function removeClass(e, c)
{
    if (e != null)
    {
        var nc = e.className.replace(c, '').trim();
        e.className = nc;
    }
}
/** table sticky headers **/
function stickyTableHeader(e, height)
{
    addClass(e,'sticky');
    var thead = e.querySelector('thead');
    var tr = thead.querySelector('tr');
    var ths = thead.getElementsByTagName('th');
    var tb = e.querySelector('tbody');
    /** maintain the width of the columns **/
    var trs = tb.getElementsByTagName('tr');
    var tbtd = trs[0].getElementsByTagName('td');
    for (var i = 0; i < tbtd.length; i++)
    {
        if (ths[i].scrollWidth > tbtd[i].scrollWidth)
        {
            var w = ths[i].clientWidth;
            setCSS(tbtd[i], {width: (w - 10) + "px"});
        }
    }
    setCSS(tb, {height: height});// add the height and the width of the tbody*/
}
/** search on table **/
function searchTable(tb)
{
    var val = (tb.value.toLowerCase()).trim();
    var table = tb.parentElement.parentElement;
    var tbody = table.querySelector('tbody');
    var thead = table.querySelector('thead');
    var theads = table.getElementsByTagName('thead');
    var ths = thead.getElementsByTagName('th');
    var tf = table.querySelector('tfoot');
    var trs = tbody.getElementsByTagName('tr');
    var thead2;
    if (theads.length == 1)
    {
        thead2 = createElement('thead');
        table.appendChild(thead2);
    }
    else
        thead2 = theads[1];
    for (var i = 0; i < trs.length; i++)
        if (trs[i].style.display != 'table-row')  trs[i].style.display = 'table-row';
    var count = false;
    for (var i = 0; i < trs.length; i++)
    {
        var text = trs[i].innerText.toLowerCase();
        var m = text.indexOf(val);
        if (m != -1)
        {
            count= true;
            setCSS(trs[i], {display: 'table-row'});
        }  
        else
        {
            setCSS(trs[i], {display: 'none'});
        }
    }
    for (var i = 0; i < trs.length; i++)
    {
        if (trs[i].style.display == 'table-row')
        {
            for (var j = 0; j < trs[i].children.length; j++)
            {
                 setCSS(trs[i].children[j], {width: (ths[j].clientWidth - 10) + 'px'});
            }
        }
    }
    if (!count)
        thead2.innerHTML = '<tr><td colspan="' + ths.length + '" style="width: ' + (thead.clientWidth - ths.length * 2) + 'px">No records found</td></tr>';
    else
    {
        thead2.innerHTML = '';
    }
    //tbody.style.width = thead.scrollWidth;
}
/** sort table **/
function addSort(t)
{
    var theads = t.getElementsByTagName('th');
    for (var i=0; i < theads.length; i++) {
        setAttributes(theads[i], {onclick:'sortTable(this)', class: 'sort'})
    }
}
function sortTable(th)
{
    var i = th.cellIndex;
    var table = th.parentNode;
    while (table.nodeName != 'TABLE')
        table = table.parentNode;
    var ec = table.querySelector('.asc');
    var ec2 = table.querySelector('.desc');
    function checkSort()
    {
        if (th.className.match('asc'))
        {
            removeClass(th, 'asc');
            addClass(th, 'desc');
            return true;
        }
        else if (th.className.match('desc'))
        {
            removeClass(th, 'desc');
            addClass(th, 'asc');
            return false;
        }
        else
        {
            removeClass(ec, 'asc');
            removeClass(ec2, 'desc');
            addClass(th, 'asc');
            return false;
        }
            
    }
    function naturalCompareAsc(a, b) {/** solution http://stackoverflow.com/a/15479354/4225925 **/
        var ax = [], bx = [];

        a[i].replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
        b[i].replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });

        while(ax.length && bx.length) {
            var an = ax.shift();
            var bn = bx.shift();
            var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
            if(nn) return nn;
        }

        return ax.length - bx.length;
    }
    function naturalCompareDesc(a, b) {
        var ax = [], bx = [];

        a[i].replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
        b[i].replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });

        while(ax.length && bx.length) {
            var an = ax.shift();
            var bn = bx.shift();
            var nn = (bn[0] - an[0]) || bn[1].localeCompare(an[1]);
            if(nn) return nn;
        }

        return ax.length - bx.length;
    }
    function desc(a,b){
        return b[i].localeCompare(a[i]);
    }
    var trs = table.querySelector('tbody').getElementsByTagName('tr');
    var tableArray = [];
    for (var j = 0;  j < trs.length; j++)
    {
        var tds = [];
        for (var h = 0; h < trs[j].children.length; h++)
            tds.push(trs[j].children[h].innerHTML)
        tableArray.push(tds);
    }
    function orderRows()
    {
        for (var i = 0; i < trs.length; i++)
            for (var j = 0; j < trs[i].children.length; j++)
                trs[i].children[j].innerHTML = tableArray[i][j];
    }
    if (checkSort()) 
        tableArray = tableArray.sort(naturalCompareDesc);
    else
        tableArray = tableArray.sort(naturalCompareAsc);
    orderRows();
}
