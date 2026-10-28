export const radians=r=>(r.angle||0)*Math.PI/180;
export function toLocal(r,p){const t=radians(r),dx=p.x-r.x-r.w/2,dy=p.y-r.y-r.h/2;const y=-dx*Math.sin(t)+dy*Math.cos(t);return{x:dx*Math.cos(t)+dy*Math.sin(t)-(r.skew||0)*y,y};}
export function toWorld(r,x,y){const t=radians(r);x+=(r.skew||0)*y;return{x:r.x+r.w/2+x*Math.cos(t)-y*Math.sin(t),y:r.y+r.h/2+x*Math.sin(t)+y*Math.cos(t)};}
export function corners(r){return[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,y])=>toWorld(r,x*r.w/2,y*r.h/2));}
export function contains(r,p){const q=toLocal(r,p);return r.shape==='rect'?Math.abs(q.x)<=r.w/2&&Math.abs(q.y)<=r.h/2:(q.x/(r.w/2))**2+(q.y/(r.h/2))**2<=1;}
export function regionBounds(r){const p=corners(r),x=Math.min(...p.map(p=>p.x)),y=Math.min(...p.map(p=>p.y));return{x,y,w:Math.max(...p.map(p=>p.x))-x,h:Math.max(...p.map(p=>p.y))-y};}
