const API_URL = 'http://localhost:3000/usuarios';

const formUsuario = document.getElementById('form-usuario');
const listaUsuarios = document.getElementById('lista-usuarios');
const btnCarregar = document.getElementById('btn-carregar');



formUsuario.addEventListener('submit', async (event) => {
    event.preventDefault(); //é para a pag ñ ficar carregando

    const payload = { //é um obj com propriedades
        nome: document.getElementById('nome').value, //pegando o elemento que tem o Id indicado entre parênteses e pegando o valor do elemento do input do html.
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        senha: document.getElementById('senha').value
    };

    try { //vai tentar fazer td q esta dentro desse bloco, se ñ der e aparecer um erro, ele cai no cath=tratamento de excessão.
        const res = await fetch(API_URL, { //const res de response q vai receber uma resposta de uma chamada q faremos, e vai passar como:
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload) //aq ele vai ser transformado
        });

        if (res.status === 201) { //aq vai verificar se foi 201 e se deu certo
            alert('Usuário cadastrado com sucesso!');
            formUsuario.reset();
            carregarUsuarios();
        } else {
            const erroData = await res.json(); //se não vai criar um erroData, q ai ele vai mandar um erro pro response
            alert(`Erro: ${erroData.mensagem || 'Falha ao cadastrar'}`);
        }
    } catch (erro) { //se ainda ñ conseguir tratar dentro do if else ele vai tratar aq no catch e vai mostrar o erro q chegou.
        console.error('Erro ao enviar formulário:', erro);
        alert('Erro de conexão com o servidor.'); //aq ñ vai para produção
    }
});

async function carregarUsuarios() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) throw new Error('Erro ao buscar usuários'); //aq é igual a resposta é diferente de 200

        const usuarios = await resposta.json();

        console.log(usuarios)

    } catch (erro) {
        console.error('Falha na requisição:', erro);
        alert('Não foi possível carregar a lista de usuários.');
    }
}

btnCarregar.addEventListener('click', carregarUsuarios);
window.addEventListener('DOMContentLoaded', carregarUsuarios); //quando abrir a pág vai carregar tds os usuários, lá no F12, apertar no console dela (a janelinha)