/**
 * Use bootstrap-select to enhance the functionality of dropdown on this page.
 *
 *
 * Here's what this you will need to do:
 *
 * x1. Include the following DataTables css in layout.ejs
 *    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.11.2/css/bootstrap-select.min.css">
 *
 * x2. Include the following bootstrap-select JavaScript in layout.ejs
 *    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.11.2/js/bootstrap-select.min.js"></script>
 *
 * x3. Using the bootstrap-selct plugin render dropdown on the page
 *
 * x4. Use the live search functionality to make the dropdown searchable
 *
 * x5. Add the user glyphicons next to each student in the list
 *
 * x7. Add a menu header to the dropdown
 *
 * 8. Customize further with anything you find interesting
 do this!
 *
 * Here's the documentation you need:
 * https://silviomoreto.github.io/bootstrap-select/
 * https://silviomoreto.github.io/bootstrap-select/examples/
 * http://getbootstrap.com/components/#glyphicons
 *
 */

(function() {

  $(function() {

    //code goes here
    $('#student_id').selectpicker({
      style: 'btn-info',
      size: 10,
      liveSearch: true
    });




  })

})();
