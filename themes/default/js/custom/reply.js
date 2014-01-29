var $stream = $('#stream');
var $sort = $('.com-sort');
var $alert = $('.com-alert');
var windowProxy;


var publishReply = function (activity, onSuccess, targetId) {

    activity.target = {"id": "post:"+targetId};
    $.get('apis/comments.jag', {
        activity: JSON.stringify(activity)
    }, onSuccess)
};

var showLoading = function (status) {
    if (status) {
        $alert.html('').css('display', 'inline-block').addClass('com-alert-wait');
    } else {
        $alert.hide().removeClass('com-alert-wait');
    }
};

$stream.on('click', '#btn-reply', function (e) {
    e.preventDefault();
    var $replyBtn = $(e.target);
    var id = $replyBtn.attr('value');
    var reply = $('#com-reply-'+id).val();
    
    if (!reply) {
    	$('.com-alert-'+id).html("Please add your Reply").fadeIn("fast").css('display', 'inline-block');
    } else {
        var activity = {"verb": "post",
            "object": {"objectType": "Reply", "content": reply, rating: 0}
        };
        $replyBtn.attr('disabled', 'disabled');
        showLoading(true);
        
        publishReply(activity, function (published) {
        	$replyBtn.removeAttr('disabled');
        
        if (published.success) {
            showLoading(false);
            $('#com-reply-'+id).val('');
            //load content for the current div
        }
    },id);
        
    }
});