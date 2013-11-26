var $qtnbtn = $('#btn-post');
var $answerbtn = $('#btn-answer');
var $qtntitle = $('#qtn-title');
var $qtntarget = $('#qtn-target');
var $qtn = $('#qtn-body');
var $answer = $('#answer-body');
var $answertarget = $('#answer-target');
var $qtntags = $('#qtn-tags');

$qtnbtn.click(function (e) {
    var title = $qtntitle.val();
    var question = $qtn.val();
    var tags = $qtntags.val();
    var target = $qtntarget.val();
    //TODO input validation here

     
    var pos = target.indexOf(':');
    var aid = target.substring(pos + 1);
    var type = target.substring(0, pos);
    //alert("Publishing activity0........");
    var activity = {"verb": "post", "object": {"objectType": "question", "title": title, "content": question, "tags": tags, "immediateParent":target},"target":{
    	"id":target,"type":type},"id":aid};
    alert("posting....");
    $.post('../../apis/comments.jag', {activity: JSON.stringify(activity)});
    
});

$answerbtn.click(function (e) {
    var answer = $answer.val();
    var target = $answertarget.val();
    //TODO input validation here

     
    var pos = target.indexOf(':');
    var aid = target.substring(pos + 1);
    var type = target.substring(0, pos);
    //alert("Publishing activity0........");
    var activity = {"verb": "post", "object": {"objectType": "question", "title": title, "content": question, "tags": tags, "immediateParent":target},"target":{
    	"id":target,"type":type},"id":aid};
    alert("posting....");
    $.post('../../apis/comments.jag', {activity: JSON.stringify(activity)});
    
});