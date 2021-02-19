/**
 * @ngdoc Service
 * @name inventory.service.$pouchDB
 * @module inventory
 *
 * @description
 * database layer
 *
 */

(function () {
  'use strict';
  angular.module('inventory')
    .service('$pouchDB', ["$q", function ($q) {
      PouchDB('pouchdbfind');
      var db;
      var dbName = 'inventory-management-system-dev';
      const USER_COL_PREFIX = 'USER';
      const PRODUCT_COL_PREFIX = 'PRODUCT';

      this.createDatabase = function () {
        db = new PouchDB(dbName, {
          auto_compaction: true
        })
        this.createTestUsers();
        this.createIndexes();
      }

      this.createIndexes() = function () {
        this.db.createIndex({
          index: {
            fields: ['email', 'password']
          }
        })
      }

      /**
       * Get a particular document from the db by id
       * @param id unique id of the document
       * 
       * @returns Promise
       */
      getDocumentById() = function (id) {
        return db.get(id);
      }

      /**
       * insert the document into pouch db 
       * @param {*} data must include a unique _id
       * 
       * @returns Promise 
       */
      createDocument = function (data) {
        var deferred = $q.defer();
        db.put(data).then(function (response) {
          if (response.ok) {
            this.getDocumentById(docResult.id).then(function (res) {
              deferred.resolve(res);
            }).catch(function (err) {
              deferred.reject(err);
            })
          } else {
            deferred.reject(docResult);
          }
        }).catch(function (err) {
          deferred.reject(err);
        })
        return deferred.promise;
      }

      /**
       * insert the document into pouch db 
       * @param {*} data must include a unique _id
       * 
       * @returns Promise 
       */
      updateDocument = function (id, data) {
        var deferred = $q.defer();
        this.getDocumentById(docResult.id).then(function (doc) {
          data = Object.assign(doc, data);
          db.put(data).then(function (response) {
            if (response.ok) {
              deferred.resolve(data);
            } else {
              deferred.reject(docResult);
            }
          }).catch(function (err) {
            deferred.reject(err);
          })
        }).catch(function (err) {
          deferred.reject(err);
        })
        return deferred.promise;
      }

      /**
       * delete the document
       * @param {*} id unique document _id
       * 
       */
      deleteDocument = function (id) {
        var deferred = $q.defer();
        this.getDocumentById(id).then(function (doc) {
          if (doc._id) {
            db.remove(doc).then(function (response) {
              deferred.resolve(response);
            }).catch(function (err) {
              deferred.reject(err);
            })
          } else {
            deferred.reject(doc);
          }
        }).catch(function (err) {
          deferred.reject(err);
        })
        return deferred.promise;
      }

      /**
       * get all products saved in database
       * 
       * @returns [IProduct] Array
       */
      getAllProducts = function () {
        var deferred = $q.defer();
        db.allDocs({
          include_docs: true,
          startkey: `${PRODUCT_COL_PREFIX}`,
          endkey: `${PRODUCT_COL_PREFIX}\uffff`
        }).then(function (results) {
          var products = results.rows.map((row) => {
            return ({
              _id: row.doc._id,
              productName: row.doc.productName,
              description: row.doc.description,
              price: row.doc.price,
              productType: row.doc.productType,
              quantity: row.doc.quantity,
              vendor: row.doc.vendor,
              createdDate: row.doc.createdDate,
              updatedDate: row.doc.updatedDate
            });
          });
          deferred.resolve(products);
        }).catch(function (err) {
          deferred.reject(err);
        })
        return deferred.promise;
      }

      deleteMultipleProducts = function (ids) {
        $q.all(ids.map((id) => {
          return this.deleteDocument(id)
        }));
      }

      /**
       * check user exist in db 
       * @param credentials 
       */
      checkUserCredentials = function (credentials) {
        var deferred = $q.defer();
        db.find({
          selector: credentials,
          fields: ['_id', 'email', 'name']
        }).then(function (result) {
          if (result.docs.length) {
            const user = result.docs[0];
            deferred.resolve(user);
          } else {
            const error = {
              status: 404,
              message: "Provided credentials not found"
            }
            deferred.reject(error);
          }
        })
        return deferred.promise;
      }

      /**
       * create a test user on the time of database creation
       */
      this.createTestUsers = function () {
        const _id = `${USER_COL_PREFIX}1`;

        this.getDocumentById(_id).then(function (response) {})
          .catch(function (error) {
            const userDetails = {
              _id: _id,
              email: 'test@test.com',
              name: 'Test User',
              password: '123456'
            }
            this.createDocument(userDetails);
          })
      }
    }])
})();