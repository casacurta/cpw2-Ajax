var pagina = 1; // número da página a ser carregada
var carregando = false; // indica se uma requisição Ajax está em andamento

// função para carregar mais imagens
function carregarImagens() {
  if (carregando) {
    return;
  }
  carregando = true;
  var url = "carregar-imagens.php?pagina=" + pagina;
  var ajax = new XMLHttpRequest();
  ajax.open("GET", url, true);
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {
      var divImagens = document.getElementById("imagens");
      divImagens.innerHTML += ajax.responseText;
      carregando = false;
      pagina++;
    }
  };
  ajax.send();
}

// detecta quando o usuário chegou no final da página e carrega mais imagens
window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      carregarImagens();
    }
  };