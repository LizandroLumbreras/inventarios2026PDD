import { db } from './firebase.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js';

const INVENTARIO_PATH = ['almacenes','Almacen_Liquidos','Inventario','Inv220926'];
const USUARIOS_PATH = [...INVENTARIO_PATH,'USUARIOS'];
const $ = s => document.querySelector(s);
let datos = [];
const money = n => new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Number(n)||0);
const num = v => Number(v ?? 0) || 0;
const norm = v => String(v ?? '').trim();
function pick(o,names,def=0){ for(const n of names) if(o?.[n] !== undefined && o[n] !== null) return o[n]; return def; }
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

function indexarCatalogo(docs){
  const idx = new Map();
  const add=(key,item,tipo)=>{key=norm(key); if(key && !idx.has(key)) idx.set(key,{item,tipo});};
  for(const d of docs){
    const item={_docId:d.id,...d.data()};
    add(d.id,item,'ID DOCUMENTO'); add(item.codigo,item,'CÓDIGO'); add(item.productoId,item,'PRODUCTO ID'); add(item.codigoBarra,item,'CÓDIGO BARRA');
    for(const eq of (Array.isArray(item.codigosEquivalentes)?item.codigosEquivalentes:[])) add(eq,item,'EQUIVALENTE');
  }
  return idx;
}

async function cargar(){
  $('#estado').className='status'; $('#estado').textContent='Cargando partidas y catálogo de productos…'; $('#filas').innerHTML=''; $('#filasProblemas').innerHTML='';
  try{
    const [usuariosSnap,catSnap]=await Promise.all([getDocs(collection(db,...USUARIOS_PATH)),getDocs(collection(db,'productos'))]);
    const catalogo=indexarCatalogo(catSnap.docs);
    const lecturas = await Promise.all(usuariosSnap.docs.map(async u => {
      const ps = await getDocs(collection(db,...USUARIOS_PATH,u.id,'PARTIDAS'));
      return ps.docs.map(d=>({id:d.id, usuarioId:u.id, ...d.data()}));
    }));
    const partidas = lecturas.flat();
    let sinCatalogo=0, porEquivalente=0, sinCosto=0;
    datos=partidas.map(p=>{
      const codigo=norm(p.codigo ?? p.productoId ?? p.id); const match=catalogo.get(codigo)||null; const cat=match?.item||null;
      if(!cat) sinCatalogo++; if(match?.tipo==='EQUIVALENTE') porEquivalente++;
      const cantidad=num(p.cantidad ?? p.existencia ?? p.existenciaInicial);
      const conceptoInventario=pick(p,['descripcion','nombre','concepto'],'SIN DESCRIPCIÓN');
      const concepto=cat?pick(cat,['concepto','descripcion','nombre'],conceptoInventario):conceptoInventario;
      const costo=num(cat?pick(cat,['costoSinImpuesto','costo','costo_unitario','costoUnitario','ultimoCosto','costoPromedio'],0):0);
      let ivaTasa=num(cat?pick(cat,['ivaTasa','iva','tasa_iva','tasaIva'],0):0); let iepsTasa=num(cat?pick(cat,['iepsTasa','ieps','tasa_ieps','tasaIeps'],0):0);
      if(ivaTasa>1) ivaTasa/=100; if(iepsTasa>1) iepsTasa/=100;
      const subtotal=cantidad*costo; const ivaMonto=subtotal*ivaTasa; const iepsMonto=subtotal*iepsTasa; const total=subtotal+ivaMonto+iepsMonto;
      let problema=''; if(!cat) problema='NO ENCONTRADO'; else if(costo<=0){problema='SIN COSTO'; sinCosto++;}
      return {codigo,concepto,conceptoInventario,cantidad,costo,ivaTasa,iepsTasa,ivaMonto,iepsMonto,subtotal,total,enCatalogo:!!cat,tipoMatch:match?.tipo||'',problema};
    });
    render();
    const problemas=sinCatalogo+sinCosto; $('#estado').className=problemas?'status warn':'status ok';
    $('#estado').textContent=`${datos.length} partidas · ${usuariosSnap.size} usuarios · ${catSnap.size} productos catálogo · ${porEquivalente} encontrados por equivalente · ${sinCosto} sin costo · ${sinCatalogo} no encontrados`;
  }catch(e){console.error(e); $('#estado').className='status error'; $('#estado').textContent='Error: '+e.message+' · Revisa assets/firebase.js y permisos de lectura.';}
}

function render(){
  const q=$('#buscar').value.trim().toLowerCase(); const v=datos.filter(x=>!q||x.codigo.toLowerCase().includes(q)||String(x.concepto).toLowerCase().includes(q));
  $('#filas').innerHTML=v.map(x=>`<tr${x.problema==='NO ENCONTRADO'?' class="row-not-found"':(x.problema?' class="row-problem"':'')}><td>${esc(x.codigo)}</td><td>${esc(x.concepto)}</td><td class="num">${x.cantidad}</td><td class="num">${money(x.costo)}</td><td class="num">${money(x.ivaMonto)}</td><td class="num">${money(x.iepsMonto)}</td><td class="num"><b>${money(x.subtotal)}</b></td><td class="num"><b>${money(x.total)}</b></td><td class="num">${(x.ivaTasa*100).toFixed(2)}%</td><td class="num">${(x.iepsTasa*100).toFixed(2)}%</td></tr>`).join('');
  $('#productos').textContent=`${v.length} partidas`; $('#granSubtotal').textContent='Sin impuestos: '+money(v.reduce((a,x)=>a+x.subtotal,0)); $('#granTotal').textContent='Con impuestos: '+money(v.reduce((a,x)=>a+x.total,0));
  const problemas=datos.filter(x=>x.problema); $('#problemasCount').textContent=problemas.length; $('#sinProblemas').style.display=problemas.length?'none':'block';
  $('#filasProblemas').innerHTML=problemas.map(x=>`<tr><td>${esc(x.codigo)}</td><td>${esc(x.conceptoInventario)}</td><td class="num">${x.cantidad}</td><td><span class="tag ${x.problema==='NO ENCONTRADO'?'danger':'warning'}">${x.problema}</span></td></tr>`).join('');
}

$('#buscar').addEventListener('input',render); $('#recargar').addEventListener('click',cargar);
$('#exportar').addEventListener('click',()=>{
  const rows=[['codigo','concepto','cantidad','costo','iva_monto','ieps_monto','total_sin_impuestos','total_con_impuestos','aplica_iva','aplica_ieps','coincidencia','problema'],...datos.map(x=>[x.codigo,x.concepto,x.cantidad,x.costo,x.ivaMonto,x.iepsMonto,x.subtotal,x.total,x.ivaTasa,x.iepsTasa,x.tipoMatch,x.problema])];
  const csv=rows.map(r=>r.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\n'); const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv'})); a.download='inventario_almacen_saul_29092026_costos.csv'; a.click(); URL.revokeObjectURL(a.href);
});
cargar();
