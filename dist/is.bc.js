(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.is = factory());
}(this, (function () { 'use strict';

function isArguments (obj) { return ({}).toString.call( obj ) === '[object Arguments]'; }

function isArray (obj) { return Array.isArray( obj ); }

/**
 * async function
 *
 * @syntax: 
 *  async function() {}
 *  async () => {}
 *  async x() => {}
 *
 * @compatibility
 * IE: no
 * Edge: >= 15
 * Android: >= 5.0
 *
 */

function isAsyncFunction (fn) { return ( {} ).toString.call( fn ) === '[object AsyncFunction]'; }

function isFunction (fn) { return ({}).toString.call( fn ) === '[object Function]' || isAsyncFunction( fn ); }

/**
 * arrow function
 *
 * Syntax: () => {}
 *
 * IE : no
 * Android : >= 5.0
 */

function arrowFunction (fn) {
    if( !isFunction( fn ) ) { return false; }
    return /^(?:function)?\s*\(?[\w\s,]*\)?\s*=>/.test( fn.toString() );
}

function isBoolean (s) { return typeof s === 'boolean'; }

function date (date) { return ({}).toString.call( date ) === '[object Date]'; }

function email (str) { return /^(([^#$%&*!+-/=?^`{|}~<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test( str ); }

function isString (str) { return typeof str === 'string' || str instanceof String; }

function isObject (obj) { return obj && typeof obj === 'object' && !Array.isArray( obj ); }

function empty (obj) {
    if( isArray( obj ) || isString( obj ) ) {
        return !obj.length;
    }
    if( isObject( obj ) ) {
        return !Object.keys( obj ).length;
    }
    return !obj;
}

function error (e) { return ({}).toString.call( e ) === '[object Error]'; }

function isFalse ( obj, generalized ) {
    if ( generalized === void 0 ) generalized = true;

    if( isBoolean( obj ) || !generalized ) { return !obj; }
    if( isString( obj ) ) {
        return [ 'false', 'no', '0', '', 'nay', 'n', 'disagree' ].indexOf( obj.toLowerCase() ) > -1;
    }
    return !obj;
}

function isNumber ( n, strict ) {
    if ( strict === void 0 ) strict = false;

    if( ({}).toString.call( n ).toLowerCase() === '[object number]' ) {
        return true;
    }
    if( strict ) { return false; }
    return !isNaN( parseFloat( n ) ) && isFinite( n )  && !/\.$/.test( n );
}

function isInteger ( n, strict ) {
    if ( strict === void 0 ) strict = false;


    if( isNumber( n, true ) ) { return n % 1 === 0; }

    if( strict ) { return false; }

    if( isString( n ) ) {
        if( n === '-0' ) { return true; }
        return n.indexOf( '.' ) < 0 && String( parseInt( n ) ) === n;
    }

    return false;
}

/**
 * iterable
 *
 * @compatibility
 *
 * IE: no
 * Edge: >= 13
 * Android: >= 5.0
 *  
 */

function iterable (obj) {
    try {
        return isFunction( obj[ Symbol.iterator ] );
    } catch( e ) {
        return false;
    }
}

// https://github.com/jquery/jquery/blob/2d4f53416e5f74fa98e0c1d66b6f3c285a12f0ce/test/data/jquery-1.9.1.js#L480

function plainObject (obj) {
    if( !isObject( obj ) ) {
        return false;
    }

    try {
        if( obj.constructor && !({}).hasOwnProperty.call( obj, 'constructor' ) && !({}).hasOwnProperty.call( obj.constructor.prototype, 'isPrototypeOf' ) ) {
            return false;
        }
    } catch( e ) {
        return false;
    }

    var key;
    for( key in obj ) {} // eslint-disable-line

    return key === undefined || ({}).hasOwnProperty.call( obj, key );
}

function promise (p) { return p && isFunction( p.then ); }

function regexp (reg) { return ({}).toString.call( reg ) === '[object RegExp]'; }

function isTrue ( obj, generalized ) {
    if ( generalized === void 0 ) generalized = true;

    if( isBoolean( obj ) || !generalized ) { return !!obj; }
    if( isString( obj ) ) {
        return [ 'true', 'yes', 'ok', '1', 'yea', 'yep', 'y', 'agree' ].indexOf( obj.toLowerCase() ) > -1;
    }
    return !!obj;
}

function isUndefined() {
    return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
}

function isIPv4 (ip) {
    if( !isString( ip ) ) { return false; }
    var pieces = ip.split( '.' );
    if( pieces.length !== 4 ) { return false; }

    for( var i$1 = 0, list = pieces; i$1 < list.length; i$1 += 1 ) {
        var i = list[i$1];

        if( !isInteger( i ) ) { return false; }
        if( i < 0 || i > 255 ) { return false; }
    }
    return true;
}

function url (url) {
    if( !isString( url ) ) { return false; }
    if( !/^(https?|ftp):\/\//i.test( url ) ) { return false; }
    var a = document.createElement( 'a' );
    a.href = url;

    /**
     * In IE, sometimes a.protocol would be an unknown type
     * Getting a.protocol will throw Error: Invalid argument in IE
     */
    try {
        if( !isString( a.protocol ) ) { return false; }
    } catch( e ) {
        return false;
    }

    if( !/^(https?|ftp):/i.test( a.protocol ) ) { return false; }

    /**
     * In IE, invalid IP address could be a valid hostname
     */
    if( /^(\d+\.){3}\d+$/.test( a.hostname ) && !isIPv4( a.hostname ) ) { return false; }

    return true;
}

function isNode (s) { return ( typeof Node === 'object' ? s instanceof Node : s && typeof s === 'object' && typeof s.nodeType === 'number' && typeof s.nodeName === 'string' ); }

function textNode (node) { return isNode( node ) && node.nodeType === 3; }

function elementNode (node) { return isNode( node ) && node.nodeType === 1; }

function isWindow (obj) { return obj && obj === obj.window; }

function isClass (obj) { return isFunction( obj ) && /^\s*class\s+/.test( obj.toString() ); }

function generator (fn) {
    try {
        return new Function( 'fn', 'return fn.constructor === (function*(){}).constructor' )( fn );
    } catch( e ) {
        return false;
    }
}

var is = {
    arguments : isArguments,
    array: isArray,
    arrowFunction: arrowFunction,
    asyncFunction: isAsyncFunction,
    boolean : isBoolean,
    date: date,
    email: email,
    empty: empty,
    error: error,
    false : isFalse,
    function : isFunction,
    integer: isInteger,
    iterable: iterable,
    number: isNumber,
    object: isObject,
    plainObject: plainObject,
    promise: promise,
    regexp: regexp,
    string: isString,
    true : isTrue,
    undefined : isUndefined,
    url: url,
    node: isNode,
    textNode: textNode,
    elementNode: elementNode,
    window : isWindow,
    class : isClass,
    ipv4 : isIPv4,
    generator: generator
};

return is;

})));
