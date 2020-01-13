"use strict";

// Dependency
const Scheduler = require('./scheduler');
const whosender = require('./sender');

/**
 * 
 * @param {Object} config
 * @param {boolean} config.buffer
 * @param {number} config.buffer_seconds
 * @param {number} config.buffer_max_seconds
 * @param {number} config.queue_max
 * @param {number} config.slack_url
 * @param {number} config.token_line
 * @constructor
 */
function MessageQueue(config) {
    this.config = config;
    this.messageQueue = [];
    this.scheduler = new Scheduler(config);
}


/**
 * Sends the message to Slack's Incoming Webhook.
 * If buffer is enabled, the message is added to queue and sending is postponed for couple of seconds.
 * 
 * @param {Message} message
 */
MessageQueue.prototype.addMessageToQueue = function(message) {
    const self = this;
    
    if (!this.config.buffer || !(this.config.buffer_seconds > 0)) {
        // No sending buffer defined. Send directly to Slack.
        self.SendAlert([message]);
    } else {
        // Add message to buffer
        this.messageQueue.push(message);
        // Plan send the enqueued messages
        this.scheduler.schedule(function() {
            // Remove waiting messages from global queue
            const messagesToSend = self.messageQueue.splice(0, self.messageQueue.length);
            
            self.SendAlert(messagesToSend);
        });
    }
    
}

MessageQueue.prototype.SendAlert = function(message) {
    const self = this;
     if (!this.config.slack_url!=null) {
	   whosender.sendToSlack(message, self.config);
	 }
	  if (!this.config.token_line!=null) {
	   whosender.SendToline(message, self.config);
	 }
    
}


module.exports = MessageQueue;
