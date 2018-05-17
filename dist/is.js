(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.IS = factory());
}(this, (function () { 'use strict';

var isArguments = obj => ({}).toString.call( obj ) === '[object Arguments]';

var isArray = obj => Array.isArray( obj );

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

var isAsyncFunction = fn => ( {} ).toString.call( fn ) === '[object AsyncFunction]';

var isFunction = fn => ({}).toString.call( fn ) === '[object Function]' || isAsyncFunction( fn );

/**
 * arrow function
 *
 * Syntax: () => {}
 *
 * IE : no
 * Android : >= 5.0
 */

var arrowFunction = fn => {
    if( !isFunction( fn ) ) return false;
    return /^(?:function)?\s*\(?[\w\s,]*\)?\s*=>/.test( fn.toString() );
};

var isBoolean = s => typeof s === 'boolean';

var date = date => ({}).toString.call( date ) === '[object Date]';

var email = str => /^(([^#$%&*!+-/=?^`{|}~<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test( str );

var isString = str => typeof str === 'string' || str instanceof String;

var isObject = obj => obj && typeof obj === 'object' && !Array.isArray( obj );

var empty = obj => {
    if( isArray( obj ) || isString( obj ) ) {
        return !obj.length;
    }
    if( isObject( obj ) ) {
        return !Object.keys( obj ).length;
    }
    return !obj;
};

var error = e => ({}).toString.call( e ) === '[object Error]';

var isFalse = ( obj, generalized = true ) => {
    if( isBoolean( obj ) || !generalized ) return !obj;
    if( isString( obj ) ) {
        return [ 'false', 'no', '0', '', 'nay', 'n', 'disagree' ].indexOf( obj.toLowerCase() ) > -1;
    }
    return !obj;
};

var isNumber = ( n, strict = false ) => {
    if( ({}).toString.call( n ).toLowerCase() === '[object number]' ) {
        return true;
    }
    if( strict ) return false;
    return !isNaN( parseFloat( n ) ) && isFinite( n )  && !/\.$/.test( n );
};

var isInteger = ( n, strict = false ) => {

    if( isNumber( n, true ) ) return n % 1 === 0;

    if( strict ) return false;

    if( isString( n ) ) {
        if( n === '-0' ) return true;
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

var iterable = obj => {
    try {
        return isFunction( obj[ Symbol.iterator ] );
    } catch( e ) {
        return false;
    }
};

// https://github.com/jquery/jquery/blob/2d4f53416e5f74fa98e0c1d66b6f3c285a12f0ce/test/data/jquery-1.9.1.js#L480

var plainObject = obj => {
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

    let key;
    for( key in obj ) {} // eslint-disable-line

    return key === undefined || ({}).hasOwnProperty.call( obj, key );
};

var promise = p => p && isFunction( p.then );

var regexp = reg => ({}).toString.call( reg ) === '[object RegExp]';

var isTrue = ( obj, generalized = true ) => {
    if( isBoolean( obj ) || !generalized ) return !!obj;
    if( isString( obj ) ) {
        return [ 'true', 'yes', 'ok', '1', 'yea', 'yep', 'y', 'agree' ].indexOf( obj.toLowerCase() ) > -1;
    }
    return !!obj;
};

function isUndefined() {
    return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
}

var isIPv4 = ip => {
    if( !isString( ip ) ) return false;
    const pieces = ip.split( '.' );
    if( pieces.length !== 4 ) return false;

    for( const i of pieces ) {
        if( !isInteger( i ) ) return false;
        if( i < 0 || i > 255 ) return false;
    }
    return true;
};

var url = url => {
    if( !isString( url ) ) return false;
    if( !/^(https?|ftp):\/\//i.test( url ) ) return false;
    const a = document.createElement( 'a' );
    a.href = url;

    /**
     * In IE, sometimes a.protocol would be an unknown type
     * Getting a.protocol will throw Error: Invalid argument in IE
     */
    try {
        if( !isString( a.protocol ) ) return false;
    } catch( e ) {
        return false;
    }

    if( !/^(https?|ftp):/i.test( a.protocol ) ) return false;

    /**
     * In IE, invalid IP address could be a valid hostname
     */
    if( /^(\d+\.){3}\d+$/.test( a.hostname ) && !isIPv4( a.hostname ) ) return false;

    return true;
};

var isNode = s => ( typeof Node === 'object' ? s instanceof Node : s && typeof s === 'object' && typeof s.nodeType === 'number' && typeof s.nodeName === 'string' )

var textNode = node => isNode( node ) && node.nodeType === 3;

var elementNode = node => isNode( node ) && node.nodeType === 1;

var isWindow = obj => obj && obj === obj.window;

var isClass = obj => isFunction( obj ) && /^\s*class\s+/.test( obj.toString() );

var generator = fn => {
    try {
        return new Function( 'fn', 'return fn.constructor === (function*(){}).constructor' )( fn );
    } catch( e ) {
        return false;
    }
}

var is = {
    arguments : isArguments,
    array: isArray,
    arrowFunction,
    asyncFunction: isAsyncFunction,
    boolean : isBoolean,
    date,
    email,
    empty,
    error,
    false : isFalse,
    function : isFunction,
    integer: isInteger,
    iterable,
    number: isNumber,
    object: isObject,
    plainObject,
    promise,
    regexp,
    string: isString,
    true : isTrue,
    undefined : isUndefined,
    url,
    node: isNode,
    textNode,
    elementNode,
    window : isWindow,
    class : isClass,
    ipv4 : isIPv4,
    generator
};

return is;

})));
