/**
 * Use the jQuery Validate and the bootstrap-select plugin to enhance this page
 *
 * Here's what this you will need to do:
 * x1. When the page is loaded all form fields should be disabled except
 *    for the dropdown to select a student

 * x2. Using the bootstrap-selct plugin render dropdown on the page

 * x3. Use the live search functionality to make the dropdown searchable

 * x4. Add the user glyphicons next to each student in the list

 * x6. Add a menu header to the dropdown
 *
 * 7. Customize further with anything you find intersting
 DO THIS!!!
 *
 * x8. When an student is selected the form fields should be enabled
      and populated with the data for the selected student
 * x9. Use jQuery validate and add validation to the form with the following requirements
 *    First Name - required, at least 2 characters
 *    Last Name  - required, at least 2 characters
 *	  start_date - make sure date is yyyy-mm-dd
 *	  ADD any other validation that makes you happy
 *
 * x10. Make the color of the error text red
 *
 * Here's the documentation you need:
 * https://jqueryvalidation.org/validate/
 * https://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods
 * https://silviomoreto.github.io/bootstrap-select/
 * https://silviomoreto.github.io/bootstrap-select/examples/
 * http://getbootstrap.com/components/#glyphicons
 * https://api.jquery.com/jQuery.get/
 * http://stackoverflow.com/questions/9807426/use-jquery-to-re-populate-form-with-json-data
 *
 */

(function() {

  $(function() {

    var firstName = $('#first_name');
    var lastName = $('#last_name');
    var startDate = $('#start_date');
    var sat = $('#sat');
    var gpa = $('#gpa');
    var majorID = $('#major_id');
    var studentId = $('#student_id');


    //Use the live search functionality to make the dropdown searchable
    $('#studentId').selectpicker({
      style: 'btn-info',
      //I can put the table title: and header: in here that I coded into my .ejs file too
      size: 10,
      liveSearch: true
    });

// https://learn.jquery.com/using-jquery-core/faq/how-do-i-disable-enable-a-form-element/
// my updateStudentForm properties are disabled until I run the function to enable them
// https://silviomoreto.github.io/bootstrap-select/options/#events
// this changed.bs.select 	This event fires after the selects value has been changed.
// It passes through event, clickedIndex, newValue, oldValue.

    $("#updateStudentForm :input").prop("disabled", true);

    $('#studentId').on('changed.bs.select', function(e) {
      $("#updateStudentForm :input").prop("disabled", false);
    });

    // * https://jqueryvalidation.org/validate/ about 1/3 down, used the rules and messages
// https://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods
// there are a bunch of rules for validation such as minlength, dateISO, number requires a decimal number
    $("#updateStudentForm").validate({
      errorClass: "text-danger",
      rules: {
        first_name: {
          required: true,
          minlength: 2
        },
        last_name: {
          required: true,
          minlength: 2
        },
        start_date: {
          required: true,
          dateISO: true
        },
        gpa: {
          number: true
        }
      },

      messages: {
        first_name: {
          required: "We need your first name to contact you",
          minlength: jQuery.validator.format("At least 2 characters required for first name!")
        },
        last_name: {
          required: "We need your last name to contact you",
          minlength: jQuery.validator.format("At least 2 characters required for last name!")
        },
        start_date: {
          required: "We need a valid date to contact you",
          dateISO: jQuery.validator.format("Please enter a valid format yyyy-mm-dd")
        },
        gpa: {
          number: jQuery.validator.format("Please provide a valid GPA, example 3.0")
        }
      }

    });

// in the <select id="studentId"... the value is student.student_id so if we target that
// we can find the student id number to get that url.
    $("#studentId").change(function() {
      var idclick = $(this).val()
      console.log(idclick);

      var url = ('http://localhost:1337/student' + "/" + idclick);
      console.log(url);

    $.get(url, function(data) {
      firstName.val(data.first_name);
      lastName.val(data.last_name);
      startDate.val(data.start_date);
      gpa.val(data.gpa);
      sat.val(data.sat);
      majorID.val(data.major_id);
      studentId.val(data.student_id);

    });
  });


  // another method:
  // //listen for select change
  // $('#student_id').on('changed.bs.select', function() {
  //   $("#updateStudentForm :input").prop("disabled", false);
  //
  //
  //     $( "select option:selected" ).each(function() {
  //        let recordId = $( this ).val();
  //        $.get('http://localhost:1337/student/' + recordId, function( data ) {
  //          console.log(data);
  //           $.each(data, function(name, value) {
  //              let tableData = $('[name="'+name+'"]');
  //              name = tableData.attr('name');
  //              console.log("name: " + name + " value: " + value);
  //              switch(name) {
  //                 case 'first_name':
  //                    tableData.val(value);
  //                    break;
  //                 case 'last_name':
  //                    tableData.val(value);
  //                    break;
  //                 case 'start_date':
  //                    tableData.val(value);
  //                    break;
  //                 case 'gpa':
  //                    tableData.val(value);
  //                    break;
  //                 case 'sat':
  //                    tableData.val(value);
  //                    break;
  //                 case 'major_id':
  //                    tableData.val(value);
  //                    break;
  //                 }
  //           }) // end each
  //        }); // end get
  //     }); // end select
  //  }); // end change event event









  })

})();
