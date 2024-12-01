// BACKGROUND IMAGE
function cycleImages() {
    var $active = $('#imageFader .active');
    var $next = ($active.next().length > 0) ? $active.next() : $('#imageFader .bgImage:first');
    $next.css('z-index', 2); //move the next image up the pile
    $active.fadeOut(300, function () { //fade out the top image
        $active.css('z-index', 1).show().removeClass('active'); //reset the z-index and unhide the image
        $next.css('z-index', 3).addClass('active'); //make the next image the top one
    });
}

$(document).ready(function () {
    // COUNTDOWN TIMER
    var interval = setInterval(function () {
            var $clock = $('.clock');
            var timer = $clock.html();
            timer = timer.split(':');
            var minutes = parseInt(timer[0], 10);
            var seconds = parseInt(timer[1], 10);
            seconds -= 1;

            if (minutes < 0) return clearInterval(interval);
            if (minutes < 10 && minutes.length != 2) minutes = '0' + minutes;
            if (seconds < 0 && minutes != 0) {
                minutes -= 1;
                seconds = 59;
            } else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;

            $clock.html(minutes + ':' + seconds);

            // Add warning color and blink
            if (minutes == 0 && seconds <= 30) {
                setInterval(function () {
                    $clock.fadeToggle();
                }, 500);
                $clock.addClass("warning");
            }

            if (minutes == 0 && seconds == 0) {
                clearInterval(interval);
            }
        },
        1000);

    $('div[data-questionid="1"]').show();
    $('.next_question_button').bind('click', function () {
        $(this).closest('.question_wrapper').hide().next().show();
    });

    // run every 4s
    setInterval('cycleImages()', 4000);

    // PROGRESSBAR FUNCTION
    var totalQuestions = 0;
    // Determine total amount of questions
    $('.question_wrapper').each(function () {
        var val = $(this).data('questionid');
        if (val > totalQuestions) {
            totalQuestions = val
        }
    });
    totalQuestions = totalQuestions - 1;

    // Set progress start value
    var progressStart = 10;
    $('.progress').css('width', progressStart + "%");

    // Fill progressbar
    $('.answer_clicked, .next, .next_question_button').on("click.progress", function () {
        // Get questionid from question
        var qnr = $(this).parents('.question_wrapper').data('questionid');
        // Calculate width of progressbar
        var progress = progressStart + (qnr / totalQuestions) * (100 - progressStart);
        $('.progress').css('width', progress + "%");
    });

    // Back button
    $('.previous_question_button').on("click.progress", function () {
        // Get questionid from question
        var qnr = $(this).parents('.question_wrapper').data('questionid');
        qnr = qnr - 2;
        // Calculate width of progressbar
        var progress = progressStart + (qnr / totalQuestions) * (100 - progressStart);
        $('.progress').css('width', progress + "%");
    });
});