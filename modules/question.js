/**
 * You can retrieve questions related to particular asset
 * @param target
 * @param logged
 * @param prefferdState(fresh|stale)
 */
var questions = function(target, logged, activityType, prefferdState){
	var carbon = require('carbon');
    var social = carbon.server.osgiService('org.wso2.carbon.social.service.SocialActivityService');
    
    var obj, questionsJSON;
    if (target) {
        try {
            var tenantDomain = logged ? logged.tenantDomain : "carbon.super";
            obj = JSON.parse(String(social.getSocialObjectJson(target, tenantDomain, "POPULAR")));          
            questionsJSON = obj.attachments;
        } catch (e) {
            log.error(e);
        }
        
        if (questionsJSON) {
            for (var i = questionsJSON.length -1; i >= 0 ; i--) {
                var question = questionsJSON[i];
                if(question.object.objectType != activityType){
                	questionsJSON.splice(i,1);
                }
            }
        }
        return questionsJSON;
    } else {
        return false;
    }
}

/**
 * You can retrieve individual question
 * @param target
 * @param logged
 * @param questionID
 * @param prefferdState
 */
var getQuestion = function(target, logged, questionID, activityType, prefferdState){
	
	var questionsJSON = questions(target, logged, activityType, prefferdState);
	var answersJSON = questions(target, logged, "answer", prefferdState); //return all answers for given asset
    
	if (questionsJSON) {
        for (var i = 0; i < questionsJSON.length ; i++) {
            var question = questionsJSON[i];
            if(question.id != questionID){
            	questionsJSON.splice(i,1);
            }
        }
    }
    
    if (answersJSON) {
    	/*verify two types of answers
    	 * 1. Answers on target question target.type= question
    	 * 2. Answers on answers(thread) target.type= answer
    	 */
        for (var i = 0; i < answersJSON.length ; i++) {
            var answer = answersJSON[i];
            if(answer.id != questionID){
            	answersJSON.splice(i,1);//remove answers of other questions
            }
        }
        //get answers for given question
        questionsJSON.push(answersJSON);
    }

    //return only one JSONObject
    return questionsJSON;
}