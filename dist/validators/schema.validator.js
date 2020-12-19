"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SchemaValidator=void 0;class SchemaValidator{static generateError(e,a){const r=new Error(e.name);r.status=e.status,r.message=e.message,r.stack=e.stack,a(r)}static validate(e){return(a,r,s)=>{const t=[];return["headers","body","params","query"].forEach(r=>{if(e.container)switch(r){case"body":t.push(e[r].validate(a.body));break;case"params":t.push(e[r].validate(a.params));break;case"query":t.push(e[r].validate(a.query));break;case"headers":t.push(e[r].validate(a.headers))}}),Promise.all(t).then(e=>{let a=!1;e.forEach(e=>{e.error&&!a&&(a=!0,this.generateError({status:411,stack:e.error,name:"PARAMETERS ERROR",message:"ERROR IN PARAMETERS"},s))}),a||s()},e=>{this.generateError({status:411,stack:e.error,name:"PARAMETERS ERROR",message:"ERROR IN PARAMETERS"},s)})}}}exports.SchemaValidator=SchemaValidator;