import {adjustPixels} from './photo-core.js';
self.onmessage=e=>{const{id,buffer,width,height,params}=e.data;try{const pixels=new Uint8ClampedArray(buffer);adjustPixels(pixels,width,height,params);self.postMessage({id,buffer:pixels.buffer},[pixels.buffer]);}catch(error){self.postMessage({id,error:error.message});}};
