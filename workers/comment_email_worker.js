const queue = require('../config/kue');

const commentMailer = require('../mailers/funcToSendMails');

queue.process('emails', function(job,done){
    console.log('emails worker is processing a job', job.data );
    commentMailer.sendMailForCreatingComment(job.data);
    done();
})