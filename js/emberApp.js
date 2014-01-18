'use strict';
//Define an Ember App
var PaginationApp = Ember.Application.create({
    LOG_TRANSITIONS: true
});

/* Router */
PaginationApp.Router.map(function(){
   this.resource('orders');
});

PaginationApp.IndexRoute = Ember.Route.extend({
    redirect: function(){
        this.transitionTo("orders");
    }
})

/* Order Route and Model */
PaginationApp.OrdersRoute = Ember.Route.extend({
    model: function(){
        var that = this;
        var orders = [];
        return $.getJSON('data/Orders.json').then(function(response){
            $.each(response, function (index, order) {
                orders.push(Ember.Object.create(order));
            });
            return orders;
        });
    }
});

PaginationApp.OrdersController = Ember.Controller.extend({
    currentPage: 1,
    pageSize: 10,
    selPage: 1,
    showAllClass: "collapse",
    showAllCaption: "ShowAll",

    filteredProducts : function(){
        this.set('noOfPages', Math.ceil(this.get('model').length/this.pageSize));
        return this.get('model').slice((this.currentPage-1)*this.pageSize, (this.currentPage)*this.pageSize)
    }.property('currentPage', 'pageSize'),

    disableLeft: function(){ return this.currentPage == 1; }.property('currentPage'),

    disableFirst: function(){ return this.currentPage == 1 }.property('currentPage'),

    disableRight: function(){ return this.currentPage == this.noOfPages; }.property('currentPage', 'noOfPages'),

    disableLast: function(){ return this.currentPage == this.noOfPages; }.property('currentPage', 'noOfPages'),

    disableGoto: function(){ return this.pageSize == this.get('model').length; }.property('pageSize'),

    actions: {
        navRight: function(){
            var currentPage = this.get('currentPage');
            if(currentPage < this.get('noOfPages'))
                this.set('currentPage', currentPage+1);
        },
        navLeft: function(){
            var currentPage = this.get('currentPage');
            if(currentPage > 0)
                this.set('currentPage', currentPage-1);
        },
        navFirst: function(){
            this.set('currentPage', 1);
        },
        navLast: function(){
            this.set('currentPage', this.get('noOfPages'));
        },
        showAll: function(){
            var pageSize= this.get("pageSize");
            if(pageSize != 10){
                pageSize = 10;
                this.set('showAllCaption', 'ShowAll');
                this.set('showAllClass', "collapse")
            }else {
                pageSize = this.get('model').length;
                this.set('showAllClass', "showAll");
                this.set('showAllCaption', 'Collapse');
            }
            this.set('currentPage',1);
            this.set('pageSize',pageSize);
        },
        gotoPage: function(){
            this.set('currentPage', this.get("selPage"));
        }
    }
});