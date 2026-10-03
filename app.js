let s=JSON.parse(localStorage.getItem("demoReward")||'{"name":"","balance":0,"task":"Belum dikirim","account":"","withdrawal":"Belum ada"}');

const $=id=>document.getElementById(id);
function save(){localStorage.setItem("demoReward",JSON.stringify(s))}
function money(n){return "Rp"+Number(n).toLocaleString("id-ID")}
function login(){
 const n=$("name").value.trim();
 if(!n)return alert("isi nama dulu");
 s.name=n;save();render();
}
function render(){
 $("login").classList.toggle("hidden",!s.name);
 $("app").classList.toggle("hidden",!s.name);
 if(!s.name)return;
 $("hello").textContent="Halo, "+s.name+" 👋";
 $("balance").textContent=money(s.balance);
 $("adminData").innerHTML=`<p>Status tugas: <b>${s.task}</b></p><p>Metode: <b>${s.account||"-"}</b></p><p>Penarikan: <b>${s.withdrawal}</b></p>`;
}
function downloadTask(){alert("Simulasi: halaman download aplikasi dibuka. Tidak ada aplikasi yang benar-benar diunduh.")}
function submitTask(){
 const code=$("invite").value.trim();
 if(!code)return alert("masukkan kode undangan");
 s.task="Menunggu verifikasi admin";save();render();
 $("taskStatus").innerHTML='<span class="warn">tugas dikirim, menunggu verifikasi admin.</span>';
}
function saveAccount(){
 const a=$("account").value.trim();
 if(!a)return alert("isi nomor rekening/e-wallet");
 s.account=a;save();render();$("withdrawStatus").textContent="metode tersimpan (simulasi)";
}
function withdraw(){
 const a=Number($("amount").value);
 if(a<1000)return alert("minimal penarikan Rp1.000");
 if(a>s.balance)return alert("saldo tidak cukup");
 if(!s.account)return alert("simpan rekening/e-wallet dulu");
 s.balance-=a;s.withdrawal="Menunggu pembayaran admin: "+money(a);save();render();
}
function verify(){
 if(s.task!=="Menunggu verifikasi admin")return alert("belum ada tugas yang menunggu");
 s.task="Terverifikasi";s.balance+=5000;save();render();alert("Tugas diverifikasi. +Rp5.000 (simulasi)");
}
function pay(){
 if(!s.withdrawal.startsWith("Menunggu"))return alert("tidak ada penarikan yang menunggu");
 s.withdrawal="Sudah dibayar (SIMULASI — tidak ada transfer uang asli)";save();render();
}
function show(x){
 $("user").classList.toggle("hidden",x!=="user");
 $("admin").classList.toggle("hidden",x!=="admin");
 $("userTab").classList.toggle("active",x==="user");
 $("adminTab").classList.toggle("active",x==="admin");
}
function logout(){s.name="";save();render()}
render();