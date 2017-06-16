/**
 * StudentController
 *
 * @description :: Server-side logic for managing students
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Client = require('node-rest-client').Client;
var client = new Client();
var endpoint = "http://localhost:1337/student"

module.exports = {

  /**
   * `StudentController.create()`
   */
  create: function (req, res) {

        if(req.method != "POST"){
          return res.view('create');
        }
        //if I didn't request this page with a post, go back to the create page

        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };
        //otherwise, get the data from the form.. so we can post.

        client.post(endpoint, args, function (data, response) {
            // return res.view('create', {success: { message: "Record added successfully"}});
            if(response.statusCode != "201"){
                req.addFlash("error", data.message.substring(data.message.indexOf("•")));
                return res.redirect('/create');
            }

            req.addFlash("success", "Record created successfully");
            return res.redirect('/create');
//this addFlash (built into sails) adds a temporary variable to display on the page then if you refresh it goes away
//then if it was created take me back to the create page and display the created successfully message
        })

  },


  /**
   * `StudentController.read()`
   */
  read: function (req, res) {

    client.get(endpoint, function (data, response) {
        return res.view('read', {students: data});
    }).on('error', function (err) {
        return res.view('read', {error: { message: "There was an error getting the students"}});
    });

  },
//this is making a get request to my data that is up there. we are
//returning a view - the read view, and then we make an opject with (views directory)
//students as the key, and data that came back is the data. if there is
//an error we get back this error read message.
//you hit the slash route our routes.js page tells us to go to that controller and use that method.
//'read' is a file name, read.ejs.

   /**
   * `StudentController.update()`
   */
   update: function (req, res) {

       if(req.method != "POST"){

         client.get(endpoint, function (data, response) {
           return res.view('update', {students: data});
         }).on('error', function (err) {
             return res.view('update', {error: { message: "There was an error getting the students"}});
         });

       }else{

         let studentId = req.body.student_id;
         delete req.body.student_id;

         var args = {
             data: req.body,
             headers: { "Content-Type": "application/json" }
         };

         client.put(endpoint + "/" + studentId, args, function (data, response) {

           if(response.statusCode != "200"){
               req.addFlash("error", data.message);
               return res.redirect('/update');
           }

           req.addFlash("success", "Record updated successfully");
           return res.redirect('/update');

         })

       }
     },
  /**
   * `StudentController.delete()`
   */
  delete: function (req, res) {

    if(req.method != "POST"){

      client.get(endpoint, function (data, response) {
        return res.view('delete', {students: data});
      }).on('error', function (err) {
          return res.view('delete', {error: { message: "There was an error getting the students"}});
      });

    }else{

      client.delete(endpoint + "/" + req.body.student_id, function (data, response) {

        if(response.statusCode != "200"){
            req.addFlash("error", data.message);
            return res.redirect('/delete');
        }

        req.addFlash("success", "Record deleted successfully");
        return res.redirect('/delete');

      })
    }

  }

};
