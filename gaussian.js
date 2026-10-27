// Separable Gaussian convolution with clamped edges and premultiplied alpha.
// Works without CanvasRenderingContext2D.filter, including mobile browsers.
export function gaussianBlur(canvas,sigma){
 const w=canvas.width,h=canvas.height,context=canvas.getContext('2d'),pixels=context.getImageData(0,0,w,h),input=pixels.data;
 const radius=Math.max(1,Math.ceil(sigma*3)),kernel=new Float32Array(radius*2+1);let total=0;
 for(let n=-radius;n<=radius;n++){const weight=Math.exp(-(n*n)/(2*sigma*sigma));kernel[n+radius]=weight;total+=weight;}
 for(let n=0;n<kernel.length;n++)kernel[n]/=total;
 const horizontal=new Float32Array(w*h*4);
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const at=(y*w+x)*4;let red=0,green=0,blue=0,alpha=0;for(let k=-radius;k<=radius;k++){const p=(y*w+Math.max(0,Math.min(w-1,x+k)))*4,weight=kernel[k+radius],a=input[p+3]/255;red+=input[p]*a*weight;green+=input[p+1]*a*weight;blue+=input[p+2]*a*weight;alpha+=a*weight;}horizontal[at]=red;horizontal[at+1]=green;horizontal[at+2]=blue;horizontal[at+3]=alpha;}
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const at=(y*w+x)*4;let red=0,green=0,blue=0,alpha=0;for(let k=-radius;k<=radius;k++){const p=(Math.max(0,Math.min(h-1,y+k))*w+x)*4,weight=kernel[k+radius];red+=horizontal[p]*weight;green+=horizontal[p+1]*weight;blue+=horizontal[p+2]*weight;alpha+=horizontal[p+3]*weight;}input[at]=alpha>0?red/alpha:0;input[at+1]=alpha>0?green/alpha:0;input[at+2]=alpha>0?blue/alpha:0;input[at+3]=alpha*255;}
 context.putImageData(pixels,0,0);return canvas;
}
