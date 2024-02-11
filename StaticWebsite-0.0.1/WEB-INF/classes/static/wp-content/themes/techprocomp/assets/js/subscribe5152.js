
(function ($) {
    $(document).ready(function () {
        console.log('subscribe with reCAPTCHA v3');

        $('#email_signup_form').on('submit', function (e) {
            e.preventDefault();

            grecaptcha.ready(function() {
                grecaptcha.execute('6LfpfD4pAAAAAGXQ5jjAEc497PYVT5XuaY734duN', {action: 'submit'}).then(function(token) {
                    var email = $('#email_field').val();
                    var nonce = $('#email_signup_nonce').val();
                    var messageDiv = $('#email-signup-message');

                    $.ajax({
                        type: 'post',
                        url: ajax_object.ajax_url,
                        data: {
                            action: 'email_signup',
                            email_field: email,
                            email_signup_nonce: nonce,
                            'g-recaptcha-response': token
                        },
                        success: function (response) {
                            console.log('AJAX Success:', response);
                            messageDiv.text(response).removeClass('error-message');

                            // Check if the response is a success message
                            if (response === 'Email added successfully.') {
                                messageDiv.addClass('success-message');
                            } else {
                                messageDiv.addClass('error-message');
                            }
                        },
                        error: function (error) {
                            console.error('AJAX Error:', error);
                            messageDiv.text('An error occurred.').addClass('error-message').removeClass('success-message');
                        }
                    });
                });
            });
        });
    });
})(jQuery);
