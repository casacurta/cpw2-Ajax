# cpw2-Ajax
# Exercício de ajax

Implemente uma página web que contenha uma lista vertical de imagens, quando o
usuário chegar no final da página (scroll) mais imagens aleatórias devem ser 
carregadas por meio de uma requisição Ajax.

## Dicas de implementação

Para implementar uma página web com uma lista vertical de imagens que carregam
mais imagens por meio de uma requisição Ajax, você pode seguir os seguintes
passos. Entretanto, lembre-se que esses passos são apenas uma referência para
você ter ideias de onde iniciar, assim, não confie nos trechos de códigos dos
exemplos:

1. Crie uma página HTML com a estrutura básica, incluindo um contêiner para a
   lista de imagens, exemplo:

```html
<!DOCTYPE html>
<html>
<head>
	<title>Lista de imagens com carga dinâmica</title>
</head>
<body>
	<div id="images"></div>
	<script src="script.js"></script>
</body>
</html>
```

1. Adicione um arquivo JavaScript externo para manipular a página e carregar as
   imagens dinamicamente, por exemplo:

```javascript
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
```

1. Crie um arquivo JSON que irá armazenar a lista de imagens, por exemplo:

```json
{
  "animals": [
    {"imagemUrl": "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg", "name": "Gato"},
    {"imagemUrl": "https://cdn.pixabay.com/photo/2018/01/28/12/37/penguin-3112331_960_720.jpg", "name": "Pinguim"},
    {"imagemUrl": "https://cdn.pixabay.com/photo/2016/02/10/16/37/cat-1192026_960_720.jpg", "name": "Gato 2"},
    {"imagemUrl": "https://cdn.pixabay.com/photo/2015/08/06/17/23/raccoon-879488_960_720.jpg", "name": "Guaxinim"},
    {"imagemUrl": "https://cdn.pixabay.com/photo/2014/08/26/15/28/lion-428177_960_720.jpg", "name": "Leão"},
    {"imagemUrl": "https://cdn.pixabay.com/photo/2018/05/09/21/05/bird-3385271_960_720.jpg", "name": "Pássaro"},
    {"imagemUrl": "https://cdn.pixabay.com/photo/2015/06/08/15/18/tiger-801609_960_720.jpg", "name": "Tigre"},
    {"imagemUrl": "https://cdn.pixabay.com/photo/2017/05/18/13/32/giraffe-2320562_960_720.jpg", "name": "Girafa"},
    {"imagemUrl": "https://cdn.pixabay.com/photo/2017/09/07/08/54/elephant-2726022_960_720.jpg", "name": "Elefante"},
    {"imagemUrl": "https://cdn.pixabay.com/photo/2016/11/22/21/42/primate-1853558_960_720.jpg", "name": "Macaco"}
  ]
}
```

4. Modifique o trecho abaixo para carregar as imagens proveniente do json:

```javascript
    if (ajax.readyState == 4 && ajax.status == 200) {
        var divImagens = document.getElementById("imagens");
        divImagens.innerHTML += ajax.responseText;
        carregando = false;
        pagina++;
    }
```

    Por exemplo:

```javascript
    if (ajax.readyState == 4 && ajax.status == 200) {
        var images = JSON.parse(ajax.responseText);
        var divImagens = document.getElementById("images");
        for (const image of images.animals) {
            var img = document.createElement("img");
            img.src = image.imagemUrl;
            img.alt = image.name;
            divImagens.appendChild(img);
        }
        carregando = false;
        pagina++;
    }
```
