
import React from 'react'
import { pubsub, sanitizeOutlineInput } from './utils'

import wrapStylesFactory from './wrapStyles'
import Styles from './Styles'

const userSetOptions = { named:true/* prefix:getVendorPrefix()*/ }

const wrapStyles = wrapStylesFactory(userSetOptions)

//=====================================================
//============================= top Level - Wrap Styles
//=====================================================

// TODO remove styleCSS args

function outline(_styles,options={},styleCSS={}){
  return sanitizeOutline(sanitizeOutlineInput(_styles,options),options)
}

function sanitizeOutline(_styles,options={},styleCSS={}){

  const wrappedStyles = wrapStyles(_styles,options,styleCSS);
        wrappedStyles.colors = wrappedStyles.colors
                            || options        && options.colors
                            || userSetOptions && userSetOptions.colors;
  return wrappedStyles;
}

//=====================================================
//============================================= Options
//=====================================================

function withOptions(options){
  if(!options) throw new Error("Bad options values for react-outline:"+JSON.stringify(options))

  const tempOutlineFn = (_styles,optionsOrLogic)=>sanitizeOutline(sanitizeOutlineInput(_styles,optionsOrLogic),options)
  if(options.colors){
    tempOutlineFn.colors = options.colors
  }
  return tempOutlineFn;
}

function setOptions(options){
  if(!options) throw new Error("Bad options values for react-outline:"+JSON.stringify(options))
  if(options.colors){
    outline.colors = options.colors
  }
  Object.assign(userSetOptions,options)
}

const testing = {
  resetCSS: pubsub.clear
}

export default outline
export { withOptions, setOptions, Styles, testing }