/*-------------------- Thymol - the flavour of Thymeleaf --------------------*

   Thymol version ${thymolVersion} Copyright (C) 2012-2015 James J. Benson.
   jjbenson .AT. users.sf.net (http://www.thymoljs.org/)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" basis,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either expressed or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

 *---------------------------------------------------------------------------*/

( function() {
  var thymolConfiguration = {
    // Please set the values of the following fields!
    thScriptName : "${thThymolSource}",
    thJQuerySource : "${thJQuerySource}",
    // These are defaults, change them if you wish..
    thDefaultPrefix : "th",
    thDefaultDataPrefix : "data",
    thDefaultPrecision : 10,
    thDefaultProtocol : "file:///",
    thDefaultLocale : "en",
    thDefaultPrecedence : 20000,
    thDefaultMessagePath : "",
    thDefaultResourcePath : "",
    thDefaultMessagesBaseName : "Messages",
    thDefaultRelativeRootPath : "", // Non-blank signifies use of thymol.js relative addressing
    thDefaultExtendedMapping : false,
    thDefaultLocalMessages : true,
    thDefaultDisableMessages : false,
    thDefaultTemplateSuffix : ".html"
  };
  thymol = function( conf ) {
    conf.ready = function( func ) {
      if( typeof thymolDeferredFunctions === "undefined" || thymolDeferredFunctions === null ) {
        thymolDeferredFunctions = [];
      }
      thymolDeferredFunctions.push( func );
    };
    return conf;
  }( thymolConfiguration );
  thymol.thDomParser = DOMParser;
  thymol.thWindow = window;
  var toc = 0;
  var loadScript = function( script, params ) {
    var el = document.createElement( "script" );
    el.async = false;
    if( typeof script !== "undefined" && script !== null ) {
      el.src = script;
    }
    if( typeof params !== "undefined" && params !== null ) {
      el.src += params.charAt( 0 ) === "?" ? params : "?" + params;
    }
    el.type = "text/javascript";
    ( document.getElementsByTagName( "HEAD" )[ 0 ] || document.body ).appendChild( el );
  };
  var scripts = document.getElementsByTagName( "script" );
  var script = document.currentScript || scripts[ scripts.length - 1 ];
  var scriptSrc = script.getAttribute( "src" );
  var pathEnd = scriptSrc.lastIndexOf( "/" );
  if( pathEnd >= 0 ) {
    thymol.thLocation = scriptSrc.substring( 0, 1 + pathEnd );
  }
  var jquerySrc = script.getAttribute( "data-jquery-src" );
  if( !!jquerySrc || "" === jquerySrc ) {
    thymol.thJQuerySource = jquerySrc;
    if( "" !== thymol.thJQuerySource ) {
      loadScript( thymol.thJQuerySource );
    }
  }
  else if( typeof thymol.thJQuerySource !== "undefined" && thymol.thJQuerySource !== null && thymol.thJQuerySource.length > 0 ) {
    var hasProtocol = thymol.thJQuerySource.indexOf( ":/" ) >= 0;
    if( hasProtocol || thymol.thJQuerySource.charAt( 0 ) === "/" ) {
      if( !hasProtocol ) {
        loadScript( thymol.thDefaultProtocol + thymol.thJQuerySource );
      }
      else {
        loadScript( thymol.thJQuerySource );
      }
    }
    else {
      loadScript( thymol.thLocation + thymol.thJQuerySource );
    }
  }
  var thymolSrc = script.getAttribute( "data-thymol-src" );
  if( !!thymolSrc ) {
    thymol.thScriptName = thymolSrc;
  }
  var parameters = null;
  for( var i = 0, iLimit = scripts.length; i < iLimit; i++ ) {
    parameters = scripts[ i ].getAttribute( "data-thymol-parameters" );
    if( !!parameters ) {
      break;
    }
  }
  loadScript( thymol.thLocation + thymol.thScriptName, parameters );
} )();