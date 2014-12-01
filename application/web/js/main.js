/* globals jQuery: false */

"use strict";

var Shop = {
    'addToCart' : function(productId, quantity, callback) {
        var data = {
            'id' : productId,
            'quantity' : typeof(quantity) !== 'undefined' ? quantity : 1
        };
        jQuery.ajax({
            'data' : data,
            'dataType' : 'json',
            'success' : function(data) {
                if (typeof(callback) === 'function') {
                    callback(data);
                }
            },
            'type' : 'post',
            'url' : '/cart/add'
        });
    },
    'changeAmount' : function(orderItemId, quantity, callback) {
        var data = {
            'id' : orderItemId,
            'quantity' : quantity
        };
        jQuery.ajax({
            'data' : data,
            'dataType' : 'json',
            'success' : function(data) {
                if (typeof(callback) === 'function') {
                    callback(data);
                }
            },
            'type' : 'post',
            'url' : '/cart/change-quantity'
        });
    }
};

var DotPlant = {
    'setPreference' : function(key, value) {
        jQuery.ajax({
            'data' : {
                'key': key,
                'value': value
            },
            'dataType' : 'json',
            'success' : function(data) {
                location.reload(true);
                return false;
            },
            'url' : '/user-preferences/set'
        });
        return false;
    }
};

jQuery(function() {
    jQuery('#print-page').click(function() {
        window.print();
        return false;
    });
    jQuery('[data-action=delete]').click(function() {
        var $link = jQuery(this);
        jQuery.ajax({
            'dataType' : 'json',
            'success' : function(data) {
                if (data['success']) {
                    location.reload();
                }
            },
            'url' : $link.data('url')
        });
        return false;
    });
    jQuery('[data-action="add-to-cart"]').click(function() {
        var $this = jQuery(this);
        Shop.addToCart($this.attr('data-id'), 1, function(data) {
            var $widget = jQuery('#cart-info-widget');
            $widget.find('.total-price').text(data['totalPrice']);
            $widget.find('.items-count').text(data['itemsCount']);
        });
        return false;
    });

    jQuery('[data-dotplant-listViewType]').click(function(){
        var $this = jQuery(this);

        DotPlant.setPreference('listViewType', $this.data('dotplantListviewtype'));
        return false;
    });

    jQuery('select[data-userpreference]').change(function(){
        var $this = jQuery(this);
        DotPlant.setPreference($this.data('userpreference'), $this.val());
        return false;
    })
});