/******************************************************************
 * Copyright (C) 2020 LvChengbin
 * 
 * File: src/generalized-true.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 08/12/2020
 * Description: 
 ******************************************************************/

import isString from './string';

const list = [ 'true', 'yes', '1', 'yea', 'y', 'agree', 'ok', 'yep' ];

<<<<<<< HEAD
export default ( x: any, haystack: string[] = list ): boolean => {
=======
export default ( x: unknown, haystack: string[] = list ): boolean => {
>>>>>>> x
    if( isString( x ) ) {
        return haystack.includes( ( x as string ).toLowerCase() );
    }
    return !!x;
}
