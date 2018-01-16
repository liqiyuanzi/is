import isFunction from './function';

export default fn => {
    if( !isFunction( fn ) ) return false;
    return /^(?:function)?\s*\(?[\w\s,]*\)?\s*=>/.test( fn.toString() );
};
